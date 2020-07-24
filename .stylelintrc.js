module.exports = {
  extends: ["stylelint-config-sass-guidelines", "stylelint-config-css-modules"],
  plugins: ["stylelint-scss"],
  rules: {
    /* string-quotes: matches Prettier formatting */
    "string-quotes": "double",

    /* Rules disabled to grandfather in stylesheets from pre-CSS Modules codebase. */
    "max-nesting-depth": null, // TODO [JSS-24]
    "selector-class-pattern": null, // TODO [JSS-25]
    "selector-max-compound-selectors": null, // TODO [JSS-26]

    /* The following will be removed when we turn on the rule to disallow styling by tag */
    "selector-no-qualifying-type": null,

    /* Disable native Stylelint rules in favour of SCSS-specific ones */
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
  },
};
