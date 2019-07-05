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
