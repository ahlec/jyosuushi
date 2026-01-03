/**
 * Ideally, we'd have the ability to sort these in a
 * fixed order:
 *  1. version
 *  2. date
 *  3. newFeatures
 *  4. improvements
 *  5. bugFixes
 *  6. developerChanges
 * So that it mirrors the order that we intend to display
 * it on the site. But `sort-keys` isn't THAT flexible and
 * it feels like it'd be more confusing to have it in
 * alphabetical order here.
 */
/* eslint-disable sort-keys */

import { ChangelogVersion } from "./types";

export const CHANGELOG: readonly ChangelogVersion[] = [
  {
    version: "v4.0.1",
    date: "3 January 2026",
    newFeatures: [],
    improvements: [],
    bugFixes: [{ text: "Corrected readings for 10日, 19日, 29日, and so on." }],
    developerChanges: [
      "Updated codebase to modern technologies to ensure future development.",
    ],
  },
  {
    version: "v4.0.0",
    date: "12 January 2022",
    comments: `Version 3.0.0 rolled out user accounts as a solution to allowing you to create custom collections. However, this increased development complexity considerably and introduced a number of negative side effects — server instability, slow network requests, and requiring visitors to give their information (via registration) in order to access features. The uptake of user accounts was also rather low (though huge thanks and appreciation to everybody who registered).
    
I've opted to remove the backend from the application, fixing our downtime issues. This also removes user accounts. But custom collections still remain! They will now be saved in your browser. This comes with tradeoffs, but I hope you'll find this to be a net win.`,
    bugFixes: [],
    improvements: [
      {
        label: "In-browser custom collections.",
        details:
          "Custom collections no longer require user accounts, and are super fast!",
      },
      {
        label: "Dramatically improved stability.",
        details:
          "Removal of the backend server removes any risk of the downtime we've seen throughout the past year, in perpetuity.",
      },
    ],
    newFeatures: [],
    developerChanges: ["Removed the backend server."],
  },
  {
    version: "v3.1.0",
    date: "7 March 2021",
    newFeatures: [
      {
        label: "New counters.",
        details:
          "Meet the latest addition to the crew: 株, 試合, 店, 部, and the LONG overdue 杯.",
      },
      {
        label: "New collection.",
        details:
          "You'll now be able to check out the **Office Life** collection, featuring counters you'd likely need for a corporate day job.",
      },
    ],
    improvements: [],
    bugFixes: [
      {
        text: "Fixed an issue where external links for some counters displayed weird text symbols.",
      },
    ],
    developerChanges: [
      "Rewrote the Markdown parsing pipeline, improving reuse and maintainability as well as preparing groundwork for migrating data to server.",
      "Updated the format of the Markdown-transpiled JSX components.",
      "Counter external links now use Markdown instead of raw text.",
      "Validation for external link Markdown added to `yarn db:audit`.",
      "Updated Sass imports to use aliases instead of relative paths.",
      "Migrated more code into the modules system (quizzes and data exploration).",
    ],
  },
  {
    version: "v3.0.0",
    date: "12 February 2021",
    comments: `At long (long) last, I'm pleased to finally give you v3.0.0! This has been a tremendously long time in the making — almost a year's worth of development went in to this release. **助数詞を練習！！** reached a point where adding the features I wanted would require a ton of work. Additionally, balance that with a full-time job, full-time studies, a personal life, the apocalypse that was 2020... That's done though, and it's time to move forward.

This release represents a pivot in the purpose of this tool. Earlier versions were exclusively geared around quizzing yourself to study. Beginning with v3.0.0, I'm looking to evolve **助数詞を練習！！** into not just a place to quiz yourself, but a reference tool and place to learn — both about the counters themselves, and about the language they exist within. This will be a long process and will involve a lot of coding and a LOT more research, but I'm hopeful that one day this can become a tool and body of work that undoes the dread that learning and using counters can cause.
    
I've learned a number of lessons through this release, and I'm looking to avoid bundling research and features into large releases after this. "You'll get it when it's ready," but no later than that.
    
Finally, you can follow us on Twitter at [@jyosuushi](https://www.twitter.com/jyosuushi) or me personally at [@AlecDeitloff](https://www.twitter.com/AlecDeitloff). Don't be a stranger — language learning is a communal adventure.`,
    newFeatures: [
      {
        label: "User accounts.",
        details:
          "You're now able to register an account that allows you to personalize your experience here.",
      },
      {
        label: "Custom collections.",
        details:
          'Study packs were reworked into "collections" to broaden their usability, and if you register an account you can create your own.',
      },
      {
        label: "Research notes added.",
        details:
          "Some counters have received meticulously-researched notes concerning their nuance, readings, or anything else you need to know.",
      },
    ],
    improvements: [
      {
        label: "Integrated feedback and bug reporting.",
        details:
          "No longer do you need to go to a Google Form - feedback and bug reporting are now a native part of the website.",
      },
      {
        label: "Revamped release notes.",
        details:
          "It's now easier to see information you want, and dates for releases were added (to prove that I'm not totally dead).",
      },
    ],
    bugFixes: [],
    developerChanges: [
      "Transitioned the repository into a server + client monorepo.",
      "Built a GraphQL-powered backend server.",
      "Rebuilt the Markdown processor engine to interpret Markdown at compile time and not at runtime.",
      "Building the release is now done using gulp.",
      "Added documentation to the repository to enable new contributors.",
      "Enabled a ton of ESLint rules (such as a11y support and React hooks) and fixed violations throughout the codebase.",
      "Migrated to CSS Modules.",
      "Replaced home-grown localization files with react-intl utilizing in-house tooling.",
    ],
  },
  {
    version: "v2.5.3",
    date: "15 July 2020",
    newFeatures: [],
    improvements: [],
    bugFixes: [
      {
        browser: "firefox",
        text: "Fixed a bug that prevented using the enter key to progress to the next question during quizzes.",
      },
    ],
    developerChanges: [],
  },
  {
    version: "v2.5.2",
    date: "26 May 2020",
    newFeatures: [],
    improvements: [],
    bugFixes: [
      {
        text: "Fixed an error that would prevent progression in quizzes that contained the counter 時 (that is, the _Essential_ and _JLPT N5_ study packs).",
      },
    ],
    developerChanges: [],
  },
  {
    version: "v2.5.1",
    date: "23 February 2020",
    newFeatures: [],
    improvements: [],
    bugFixes: [
      {
        text: 'Fixed a bug where counters that used alternative readings (such as 人 allow for 4 to be read as "よ") would incorrectly apply this change elsewhere in the number (producing readings like よじゅうよにん instead of よ**ん**じゅうよにん).',
      },
    ],
    developerChanges: ["Migrated from TSLint to ESLint."],
  },
  {
    version: "v2.5.0",
    date: "16 February 2020",
    newFeatures: [
      {
        label: "New domain name.",
        details:
          "We've moved! You can now find us at [https://www.jyosuushi.com/](https://www.jyosuushi.com/).",
      },
      {
        label: "New counters added.",
        details: "A couple more counters have joined the fray!",
      },
    ],
    improvements: [
      {
        label: "New layout for counters page.",
        details:
          "The individual counters page have been given a new layout to help them grow to include more information. You'll start to notice some entries having links to other articles, descriptions, and comparisons with similar counters and what makes them different.",
      },
    ],
    bugFixes: [],
    developerChanges: [
      "Upgraded dependencies to their latest versions.",
      "Reworked the internal auditing scripts to speed up data development and create stronger oversight on data.",
      "Introduced aliasing for imports.",
      "Improved support for linting and format enforcement.",
    ],
  },
  {
    version: "v2.4.0",
    date: "23 September 2019",
    newFeatures: [
      {
        label: "New counters added.",
        details:
          "We have a couple more added to the pool now! Trying to ramp production up.",
      },
    ],
    improvements: [
      {
        label: "Preview counters.",
        details:
          "You can preview any amount for a counter now when visiting its page!",
      },
    ],
    bugFixes: [
      {
        text: "Fixed a bug where per-item maximum values were ignored and it lead to wonky questions (like 39 0'clock).",
      },
      {
        text: "Fixed a bug where you could go to pages for counters or study packs that didn't exist.",
      },
    ],
    developerChanges: [
      "Database is now stored in SQL files rather than a SQLite database, to improve conflict resolution and readability.",
      "Implemented a scraper for a website with a ton of counters, to collect items grouped by counter.",
    ],
  },
  {
    version: "v2.3.0",
    date: "15 July 2019",
    newFeatures: [
      {
        label: "New counters added.",
        details:
          "It's slow but steady work. A number of new counters are now available!",
      },
      {
        label: "Added a settings page.",
        details:
          "You can now start changing settings around how the site works!",
        nestedListItems: [
          "Control the range of amounts that will be generated for questions.",
          "Make the quiz last forever in endless mode!",
        ],
      },
    ],
    improvements: [
      {
        label: "Further tweak amount generation.",
        details:
          "Further work was done to make sure that the random amounts you're quizzed with will be better distributed so you get more variation, and you can focus more on interesting amounts rather than mundane.",
      },
    ],
    bugFixes: [],
    developerChanges: [
      "Added a script that's able to audit the database and detect points of interest.",
    ],
  },
  {
    version: "v2.2.0",
    date: "5 July 2019",
    newFeatures: [
      {
        label: "New layout.",
        details:
          "The home screen has been updated! A sidebar was added, and almost everything that was previously in a modal now has its own page. With the increase in space, more features will be able to come very shortly!",
      },
    ],
    improvements: [],
    bugFixes: [
      {
        text: "Fixed a bug where the number of irregular conjugations after the first 17 wouldn't be included in the count of total irregulars.",
      },
      { text: "Added a missing conjugation rule between 8 and か行." },
    ],
    developerChanges: [
      "Upgraded _all_ packages to their latest versions!",
      "Defined counters that do not have associated items are no longer exported from the database.",
      "Added `react-router` and set up the application to work as a true SPA.",
    ],
  },
  {
    version: "v2.1.0",
    date: "25 June 2019",
    newFeatures: [
      {
        label: "Added release notes!",
        details: "You'll see what changed when you load the page!",
      },
    ],
    improvements: [
      {
        label: "Improved question generation.",
        details:
          "An attempt was made to focus more on the core numbers (1-10) and anything irregular or unexpected, and less on 42, 44, 45, 49 for every question.",
      },
      {
        label: "Reduced the number of questions per counter.",
        details: "It was... very high. Now it's less high.",
      },
    ],
    bugFixes: [
      {
        browser: "safari",
        text: "Fixed a bug where the header would not fully transition.",
      },
      {
        browser: "safari",
        text: "Fixed a bug where the tutorial had the text rendering on top of images.",
      },
      {
        browser: "firefox",
        text: "Fixed a bug where the furigana were floating off to the side of the kanji.",
      },
      {
        text: "Switched to using Google Forms to address issues with previous bug report/submission box.",
      },
    ],
    developerChanges: [],
  },
  {
    version: "v2.0.0",
    date: "21 June 2019",
    isInitialRelease: true,
  },
];
