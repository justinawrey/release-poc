const config = require("../../release.base.config.cjs");
const packageJson = require("./package.json");

module.exports = {
  ...config,
  tagFormat: `${packageJson.name}-v\${version}`,
};
