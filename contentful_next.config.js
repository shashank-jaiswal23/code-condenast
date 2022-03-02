const path = require("path");
module.exports = {
  i18n: {
    locales: [
      "en-US",
      "zh-CN",
      "zh-Hant-TW",
      "fr",
      "it",
      "ja",
      "pt",
      "ru",
      "es",
      "es-419",
    ],
    defaultLocale: "en-US",
  },
  sassOptions: {
    includePaths: [path.join(__dirname, "styles")],
  },
};
