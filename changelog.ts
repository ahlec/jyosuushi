export interface ConsumerFacingEntry {
  label: string;
  details: string;
  nestedListItems?: readonly string[];
}

export interface BugFixEntry {
  browser?: "chrome" | "firefox" | "safari" | "edge" | "ie";
  text: string;
}

export interface IncrementalVersion {
  date: string;
  version: string;
  bugFixes: readonly BugFixEntry[];
  newFeatures: readonly ConsumerFacingEntry[];
  improvements: readonly ConsumerFacingEntry[];
  developerChanges: readonly string[];
}

export interface FirstVersion {
  version: string;
  date: string;
  isInitialRelease: true;
}

export type ChangelogVersion = Readonly<FirstVersion | IncrementalVersion>;

export function isFirstVersion(
  version: ChangelogVersion
): version is FirstVersion {
  return "isInitialRelease" in version && version.isInitialRelease === true;
}

const CHANGELOG: readonly ChangelogVersion[] = [
  {
    version: "v2.5.1",
    date: "23 February 2020",
    newFeatures: [],
    improvements: [],
    bugFixes: [
      {
        text:
          'Fixed a bug where counters that used alternative readings (such as 人 allow for 4 to be read as "よ") would incorrectly apply this change elsewhere in the number (producing readings like よじゅうよにん instead of よ**ん**じゅうよにん).'
      }
    ],
    developerChanges: ["Migrated from TSLint to ESLint."]
  },
  {
    version: "v2.5.0",
    date: "16 February 2020",
    newFeatures: [
      {
        label: "New domain name.",
        details:
          "We've moved! You can now find us at [https://www.jyosuushi.com/](https://www.jyosuushi.com/)."
      },
      {
        label: "New layout for counters page.",
        details:
          "The individual counters page have been given a new layout to help them grow to include more information. You'll start to notice some entries having links to other articles, descriptions, and comparisons with similar counters and what makes them different."
      },
      {
        label: "New counters added.",
        details: "A couple more counters have joined the fray!"
      }
    ],
    improvements: [],
    bugFixes: [],
    developerChanges: [
      "Upgraded dependencies to their latest versions.",
      "Reworked the internal auditing scripts to speed up data development and create stronger oversight on data.",
      "Introduced aliasing for imports.",
      "Improved support for linting and format enforcement."
    ]
  },
  {
    version: "v2.4.0",
    date: "23 September 2019",
    newFeatures: [
      {
        label: "New counters added.",
        details:
          "We have a couple more added to the pool now! Trying to ramp production up."
      },
      {
        label: "Preview counters.",
        details:
          "You can preview any amount for a counter now when visiting its page!"
      }
    ],
    improvements: [],
    bugFixes: [
      {
        text:
          "Fixed a bug where per-item maximum values were ignored and it lead to wonky questions (like 39 0'clock)."
      },
      {
        text:
          "Fixed a bug where you could go to pages for counters or study packs that didn't exist."
      }
    ],
    developerChanges: [
      "Database is now stored in SQL files rather than a SQLite database, to improve conflict resolution and readability.",
      "Implemented a scraper for a website with a ton of counters, to collect items grouped by counter."
    ]
  },
  {
    version: "v2.3.0",
    date: "15 July 2019",
    newFeatures: [
      {
        label: "New counters added.",
        details:
          "It's slow but steady work. A number of new counters are now available!"
      },
      {
        label: "Added a settings page.",
        details:
          "You can now start changing settings around how the site works!",
        nestedListItems: [
          "Control the range of amounts that will be generated for questions.",
          "Make the quiz last forever in endless mode!"
        ]
      }
    ],
    improvements: [
      {
        label: "Further tweak amount generation.",
        details:
          "Further work was done to make sure that the random amounts you're quizzed with will be better distributed so you get more variation, and you can focus more on interesting amounts rather than mundane."
      }
    ],
    bugFixes: [],
    developerChanges: [
      "Added a script that's able to audit the database and detect points of interest."
    ]
  },
  {
    version: "v2.2.0",
    date: "5 July 2019",
    newFeatures: [
      {
        label: "New layout.",
        details:
          "The home screen has been updated! A sidebar was added, and almost everything that was previously in a modal now has its own page. With the increase in space, more features will be able to come very shortly!"
      }
    ],
    improvements: [],
    bugFixes: [
      {
        text:
          "Fixed a bug where the number of irregular conjugations after the first 17 wouldn't be included in the count of total irregulars."
      },
      { text: "Added a missing conjugation rule between 8 and か行." }
    ],
    developerChanges: [
      "Upgraded _all_ packages to their latest versions!",
      "Defined counters that do not have associated items are no longer exported from the database.",
      "Added `react-router` and set up the application to work as a true SPA."
    ]
  },
  {
    version: "v2.1.0",
    date: "25 June 2019",
    newFeatures: [
      {
        label: "Added release notes!",
        details: "You'll see what changed when you load the page!"
      }
    ],
    improvements: [
      {
        label: "Improved question generation.",
        details:
          "An attempt was made to focus more on the core numbers (1-10) and anything irregular or unexpected, and less on 42, 44, 45, 49 for every question."
      },
      {
        label: "Reduced the number of questions per counter.",
        details: "It was... very high. Now it's less high."
      }
    ],
    bugFixes: [
      {
        browser: "safari",
        text: "Fixed a bug where the header would not fully transition."
      },
      {
        browser: "safari",
        text:
          "Fixed a bug where the tutorial had the text rendering on top of images."
      },
      {
        browser: "firefox",
        text:
          "Fixed a bug where the furigana were floating off to the side of the kanji."
      },
      {
        text:
          "Switched to using Google Forms to address issues with previous bug report/submission box."
      }
    ],
    developerChanges: []
  },
  {
    version: "v2.0.0",
    date: "21 June 2019",
    isInitialRelease: true
  }
];

export default CHANGELOG;
