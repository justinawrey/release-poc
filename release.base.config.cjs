module.exports = function getReleaseConfig({ name, publish = false }) {
  return {
    extends: "semantic-release-monorepo",
    branches: ["main"],
    plugins: [
      "@semantic-release/commit-analyzer",
      "@semantic-release/release-notes-generator",
      "@semantic-release/changelog",
      ["@semantic-release/npm", { npmPublish: publish }],
      "@semantic-release/github",
      [
        "@semantic-release/git",
        {
          assets: ["package.json", "CHANGELOG.md"],
          message:
            "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}",
        },
      ],
    ],
    tagFormat: `${name}-v\${version}`,
  };
};
