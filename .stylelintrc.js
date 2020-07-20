module.exports = {
  extends: ["stylelint-config-sass-guidelines", "stylelint-config-css-modules"],
  plugins: ["stylelint-scss"],
  rules: {
    /* string-quotes: matches Prettier formatting */
    "string-quotes": "double",

    /* The following will be removed when CSS Modules is enabled [JSS-15] */
    "max-nesting-depth": null,
    "selector-class-pattern": null,
    "selector-max-compound-selectors": null,

    /* The following will be removed when we turn on the rule to disallow styling by tag */
    "selector-no-qualifying-type": null,

    /* Disable native Stylelint rules in favour of SCSS-specific ones */
    "at-rule-no-unknown": null,
    "scss/at-rule-no-unknown": true,
  },
};
