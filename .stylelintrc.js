module.exports = {
  extends: ["stylelint-config-sass-guidelines", "stylelint-config-css-modules"],
  plugins: ["stylelint-scss"],
  rules: {
    "at-rule-no-unknown": null, // Disable built-in rule in favor of SCSS-specific one
    "max-nesting-depth": null, // Disabled to grandfather stylesheets from pre-CSS modules
    "scss/at-rule-no-unknown": true, // Disable built-in rule in favor of SCSS-specific one
    "selector-class-pattern": null, // Disabled to grandfather stylesheets from pre-CSS modules
    "selector-max-compound-selectors": null, // Disabled to grandfather stylesheets from pre-CSS modules
    "selector-no-qualifying-type": null, // Remove when turn on rule to disallow styling by tag
    "string-quotes": "double", // Match prettier
  },
};
