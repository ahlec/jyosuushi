import chalk from "chalk";
import { orderBy, repeat } from "lodash";

import Database from "./database/Database";
import { DbCounter } from "./database/schemas";
import ValidatedDataSource from "./database/ValidatedDataSource";

interface CounterAnalysis {
  counterId: string;
  score: number;
  totalScore: number;
  missingPieces: ReadonlyArray<string>;
}

function analyzeCounter(
  counter: DbCounter,
  countersWithExternalLinks: ReadonlySet<string>,
  countersWithDisambiguations: ReadonlySet<string>
): CounterAnalysis {
  let score = 0;
  const missingPieces: string[] = [];

  if (counter.lead_in) {
    score++;
  } else {
    missingPieces.push("lead-in");
  }

  if (counter.notes) {
    score++;
  } else {
    missingPieces.push("notes");
  }

  if (countersWithExternalLinks.has(counter.counter_id)) {
    score++;
  } else {
    missingPieces.push("external links");
  }

  if (countersWithDisambiguations.has(counter.counter_id)) {
    score++;
  } else {
    missingPieces.push("disambiguations");
  }

  return {
    counterId: counter.counter_id,
    missingPieces,
    score,
    totalScore: 4,
  };
}

function selectScore({ score }: CounterAnalysis): number {
  return score;
}

const BLOCK = "█";
const CJK_SPACE_CHARACTER = "\u3000";

const COLUMN_SEPARATION = "  ";

function outputAnalysisBucket(
  header: string,
  analyses: ReadonlyArray<CounterAnalysis>,
  totalPopulationCount: number
): void {
  console.log(
    `[${chalk.rgb(92, 36, 110)(header)}] ${
      analyses.length
    } / ${totalPopulationCount} items`
  );

  for (const analysis of analyses) {
    const progressBar =
      chalk.rgb(98, 150, 50)(repeat(BLOCK, analysis.score)) +
      repeat(" ", analysis.totalScore - analysis.score);
    const missingAreas = analysis.missingPieces.length
      ? `${chalk.yellow("missing areas:")} ${analysis.missingPieces.join(", ")}`
      : "";
    const percentStr = `${Math.round(
      (analysis.score / analysis.totalScore) * 100
    )}%`;

    console.log(
      analysis.counterId.padStart(4, CJK_SPACE_CHARACTER),
      COLUMN_SEPARATION,
      `${chalk.gray("〔")}${progressBar}${chalk.gray("〕")}${percentStr.padEnd(
        4
      )}`,
      COLUMN_SEPARATION,
      missingAreas
    );
  }

  console.log();
}

async function main(): Promise<void> {
  const db = await Database.open();
  const validated = await ValidatedDataSource.validate(db);
  await db.close();

  const countersWithExternalLinks = new Set<string>();
  for (const { counter_id } of validated.counter_external_links.valid) {
    countersWithExternalLinks.add(counter_id);
  }

  const countersWithDisambiguations = new Set<string>();
  for (const { counter1_id, counter2_id } of validated.counter_disambiguations
    .valid) {
    countersWithDisambiguations.add(counter1_id);
    countersWithDisambiguations.add(counter2_id);
  }

  const analyses = orderBy(
    validated.counters.valid.map((counter) =>
      analyzeCounter(
        counter,
        countersWithExternalLinks,
        countersWithDisambiguations
      )
    ),
    selectScore,
    ["desc"]
  );

  // Chunk it
  const completed: CounterAnalysis[] = [];
  const inProgress: CounterAnalysis[] = [];
  const unstarted: CounterAnalysis[] = [];
  for (const analysis of analyses) {
    if (analysis.score >= analysis.totalScore) {
      completed.push(analysis);
    } else if (analysis.score === 0) {
      unstarted.push(analysis);
    } else {
      inProgress.push(analysis);
    }
  }

  // Output
  outputAnalysisBucket("Completed", completed, analyses.length);
  outputAnalysisBucket("In Progress", inProgress, analyses.length);
  outputAnalysisBucket("Unstarted", unstarted, analyses.length);
}

main();
