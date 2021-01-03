# Contributing

This document exists to introduce potential contributors to the configuration of the codebase, ease discovery of flows, and begin to explain some of the technologies in use. This guide won't be exhaustive, and deviating from it when developing locally is totally fine, but it's still recommended to read through so you can understand in advance. This assumes you have the repository already [set up the repository](GETTING SETUP.md).

## General

### Dependencies

This repository is a [monorepo](https://en.wikipedia.org/wiki/Monorepo) which holds, among smaller projects, both the web client and the backend server for the application. Because of this configuration, it would technically be possible for the backend server to import [`classnames`](https://www.npmjs.com/package/classnames) or the web client to import [`nodemailer`](https://www.npmjs.com/package/nodemailer). Out of the box, there's no way to express that some dependencies are allowed in certain areas and others aren't.

This is where [`good-fences`](https://github.com/smikula/good-fences) comes in. This is a program that allows directories to build "fences" around them which declares, for ALL files recursively under them, which dependencies can "come through" the gate, and which files can "go out" of the gate. And while this doesn't affect runtime and therefore doesn't _truly_ prevent these, the repository is configured with checking project boundaries as a required CI step, meaning only code which properly respects these boundaries can make it into the repository mainline.

These fences can be errected anywhere within the repository, and are defined by **fence.json** files in that directory. A quick breakdown here outlines how to read one:

* **`tags`**: An array of globally-unique strings that name this fence, so other **fence.json** files can refer to this one;
* **`exports`**: An array of relative filepaths inside this fence which other areas can import (file-level whitelist);
* **`imports`**: An array of tags for other **fence.json** files which are permitted to be imported; 
* **`dependencies`**: An array of NPM modules that can be imported.

`good-fences` is here to ensure that we are mindful around which dependencies are allowed to be used (preventing project bloat or dependency misuse), and to ensure that if there are private/privileged files somewhere, that that protection is codified/enforced.

In order to check that all of your files are in compliance, you should run the `yarn gf` command. This will log every violation. If it returns an exit code of 0 and logs nothing, then you're all good!

During your regular course of work, you should be minimally blocked by `good-fences`; it's only when you're making use of a new NPM dependency or making breaking changes that you should run into issues here. Speak with a repository admin when working on one of these.

**Dependency gotchas:**

* `good-fences` is not tracked by ESLint, so violations will **NOT** show up in your IDE or when running `yarn lint`. To check this, you'll need to explicitly run `yarn gf`.

## Client

The following sections detail development patterns or good-to-know details about contributing to the web client.

### CSS (Sass)

All of the CSS for the client is written using [Sass](https://sass-lang.com/), giving us access to preprocessor variables, functions, and so on. Sass is a superset of standard CSS, meaning that those unfamiliar with it do not have a hard barrier (though learning it is recommended, and it's really pretty simple).

More importantly, however, all Sass files are imported into the client using [CSS Modules](https://github.com/css-modules/css-modules). Simply put, you would write your CSS classes using their "regular" names (eg, `.submitButton`),  but when the client is built these names will be scrambled (eg, `._1ac3IAdV7KgbgsPA3sNBPH`). This solves problems commonly seen in large applications where there are name conflicts (two locations both created their own `.submitButton` styles). In order to bridge the gap between the names you write and the values at runtime, when you import the stylesheet in your React component, you import it into a variable, which has string variables for each development name, mapping to their runtime name. Using this looks something like so:

```typescript+jsx
import React from 'react';

import styles from "./CounterDisplay.scss";

function CounterDisplay(): React.ReactElement {
  return (
    <div className={styles.counterDisplay}>
      <div className={styles.kanji}>本</div>
      <div className={styles.reading}>ほん</div>
    </div>
  );
}
```

And the Sass file for this might look like so:

```scss
.counterDisplay {
  display: flex;
  gap: 10px;
}

.kanji {
  font-weight: bold;
}

.reading {
  font-style: italic;
}
```

Of final note here: since we're importing and using variables from the Sass file, we need to tell TypeScript what variables exist inside your Sass file using type declaration files. This is done for you by running the `yarn codegen:scss` command (or, more broadly, `yarn codegen`). Any time that you add, delete, or rename a CSS class, you should run this command to update the type declaration file.

**CSS Gotchas:**

* You'll need to run `yarn codegen:scss` manually whenever you add/rename/delete a CSS class, in order to use it without compile error in TypeScript;
* The only valid file extension for CSS files in the repository is **.scss** (this is the only extension the Webpack configuration recognizes);
* Every Sass file is configured with CSS Modules — you will always need to import your Sass file like the example above;
* CSS Modules is configured to rename the variables to lowerCamelCase, so if you declare `.MyOther_Thing` it will produce the variable `.myOtherThing`. It's recommended to name everything in lowerCamelCase from the start to avoid headache.

### Localization

Being a language-study tool, making sure the application is localizable is a first-order priority. Translation into non-English languages has not begun yet, but the web client is developed with the expectation that it eventually will be.

Localization is done using [`react-intl`](https://www.npmjs.com/package/react-intl). All text that is displayed to the user should be localized using this, and ESLint is configured to report an error where it isn't.

The standard flow is something as follows:

```typescript+jsx
import React from "react";
import { defineMessages, FormattedMessage } from "react-intl";

const INTL_MESSAGES = defineMessages({
  noText: {
    defaultMessage: "No",
    id: "explore.popups.ConfirmDeleteModal.buttons.noText",
  },
  yesText: {
    defaultMessage: "Yes",
    id: "explore.popups.ConfirmDeleteModal.buttons.yesText",
  },
});

function ConfirmDeleteModalButtons(): React.ReactElement {
  return (
    <div>
      <button>
        <FormattedMessage {...INTL_MESSAGES.noText} />
      </button>
      <button>
        <FormattedMessage {...INTL_MESSAGES.yesText} />
      </button>
    </div>
  );
};
```

All strings are declared in a file-level variable called `INTL_MESSAGES`, and then used with the `<FormattedMessage />` component. More complex examples can be found in the codebase or by checking out the `react-intl` documentation.

In order to actually localize your text, there is a custom script that will read through the client code and extract all localization strings to locale files. **When you have added/changed/deleted a localization string**, run the `yarn i18n:extract` command, which will update the locale JSON files that will be used by translators. After this, you can use `yarn codegen:i18n` to build the runtime files actually used by the client.

**Localization Gotchas:**

* Make sure to always run the `yarn i18n:extract` command (and `yarn codegen:i18n`, or `yarn codegen` more broadly) when working with localization strings;
* Watch out for places where you're codifying the grammar of a language by accident. Multiple `<FormattedMessage />` components shouldn't appear next to each other because it's usually indicating that you're developing with English grammar in mind; use [variables](https://formatjs.io/docs/react-intl/components/#message-syntax) or [rich text formatting](https://formatjs.io/docs/react-intl/components/#rich-text-formatting) to solve these problems instead.

## Before pushing

1. Run the linters locally to catch any errors/violations (`yarn lint`);
2. Check module boundaries to ensure that you haven't imported any unpermitted dependencies (`yarn gf`);
3. Make sure that you've extracted all of the internationalization strings to the locales folders, if you've been working on the client (`yarn extract:i18n`);
4. If you've been modifying data, make sure that you've dumped the contents of your SQLite database into raw SQL commends (`yarn db:dump`) and exported the data files (`yarn db:export`).