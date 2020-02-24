### v2.5.1

Bug Fixes:

- Fixed a bug where counters that used alternative readings (such as 人 allow for 4 to be read as "よ") would incorrectly apply this change elsewhere in the number (producing readings like よじゅうよにん instead of よ**ん**じゅうよにん).

Developer Changes:

- Migrated from TSLint to ESLint.

### v2.5.0

New Features:

- **New domain name.** We've moved! You can now find us at [https://www.jyosuushi.com/](https://www.jyosuushi.com/).
- **New layout for counters page.** The individual counters page have been given a new layout to help them grow to include more information. You'll start to notice some entries having links to other articles, descriptions, and comparisons with similar counters and what makes them different.
- **New counters added.** A couple more counters have joined the fray!

Developer Changes:

- Upgraded dependencies to their latest versions.
- Reworked the internal auditing scripts to speed up data development and create stronger oversight on data.
- Introduced aliasing for imports
- Improved support for linting and format enforcement.

### v2.4.0

New Features:

- **New counters added.** We have a couple more added to the pool now! Trying to ramp production up.
- **Preivew counters.** You can preview any amount for a counter now when visiting its page!

Bug Fixes:

- Fixed a bug where per-item maximum values were ignored and it lead to wonky questions (like 39 0'clock).
- Fixed a bug where you could go to pages for counters or study packs that didn't exist.

Developer Changes:

- Database is now stored in SQL files rather than a SQLite database, to improve conflict resolution and readability.
- Implemented a scraper for a website with a ton of counters, to collect items grouped by counter.

### v2.3.0

New Features:

- **New counters added.** It's slow but steady work. A number of new counters are now available!
- **Added a settings page.** You can now start changing settings around how the site works!
  - Control the range of amounts that will be generated for questions.
  - Make the quiz last forever in endless mode!
- **Further tweak amount generation.** Further work was done to make sure that the random amounts you're quizzed with will be better distributed so you get more variation, and you can focus more on interesting amounts rather than mundane.

Developer Changes:

- Added a script that's able to audit the database and detect points of interest.

### v2.2.0

New Features:

- **New layout.** The home screen has been updated! A sidebar was added, and almost everything that was previously in a modal now has its own page. With the increase in space, more features will be able to come very shortly!

Bug Fixes:

- Fixed a bug where the number of irregular conjugations after the first 17 wouldn't be included in the count of total irregulars.
- Added a missing conjugation rule between 8 and か行.

Developer Changes:

- Upgraded _all_ packages to their latest versions!
- Defined counters that do not have associated items are no longer exported from the database.
- Added `react-router` and set up the application to work as a true SPA.

### v2.1.0

New Features:

- **Improved question generation.** An attempt was made to focus more on the core numbers (1-10) and anything irregular or unexpected, and less on 42, 44, 45, 49 for every question.
- **Reduced the number of questions per counter.** It was... very high. Now it's less high.
- **Added release notes!** You'll see what changed when you load the page!

Bug Fixes:

- [Safari] Fixed a bug where the header would not fully transition.
- [Safari] Fixed a bug where the tutorial had the text rendering on top of images.
- [Firefox] Fixed a bug where the furigana were floating off to the side of the kanji.
- Switched to using Google Forms to address issues with previous bug report/submission box.

### v2.0.0

Initial release.
