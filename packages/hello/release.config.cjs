const getReleaseConfig = require("../../release.base.config.cjs");
const name = require("./package.json").name;
module.exports = getReleaseConfig({ name });
