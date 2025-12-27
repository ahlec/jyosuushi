/** @type {import('stylelint').Config} */
export default {
  extends: [
    "stylelint-config-standard",
    "stylelint-config-css-modules",
    "stylelint-config-standard-scss",
  ],
  rules: {
    "at-rule-no-unknown": null, // Disable built-in rule in favor of SCSS-specific one
    "max-nesting-depth": null, // Disabled to grandfather stylesheets from pre-CSS modules
    "no-descending-specificity": null, // Disable due to using a lot of nesting (https://github.com/stylelint/stylelint/issues/7844)
    "scss/at-rule-no-unknown": true, // Disable built-in rule in favor of SCSS-specific one
    "selector-class-pattern": null, // Disabled to grandfather stylesheets from pre-CSS modules
    "selector-max-compound-selectors": null, // Disabled to grandfather stylesheets from pre-CSS modules
    "selector-no-qualifying-type": null, // Remove when turn on rule to disallow styling by tag
    "selector-pseudo-class-no-unknown": [
      true,
      { ignorePseudoClasses: ["export", "global"] },
    ],
  },
};
