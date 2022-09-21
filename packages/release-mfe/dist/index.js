import semanticRelease from "semantic-release";
const config = {
    extends: "semantic-release-monorepo",
    branches: [
        {
            name: "main",
            channel: "latest",
        },
    ],
    plugins: [
        ["@semantic-release/commit-analyzer", { preset: "conventionalcommits" }],
        [
            "@semantic-release/release-notes-generator",
            { preset: "conventionalcommits" },
        ],
        "@semantic-release/changelog",
        ["@semantic-release/npm", { npmPublish: false }],
        // "@semantic-release/github",
        // [
        //   "@semantic-release/git",
        //   {
        //     assets: ["package.json", "CHANGELOG.md"],
        //     message:
        //       "chore(release): ${nextRelease.gitTag} [skip ci]\n\n${nextRelease.notes}",
        //   },
        // ],
    ],
};
try {
    const result = await semanticRelease(config);
    if (!result) {
        process.exit(0);
    }
    console.log("nextRelease", result.nextRelease);
}
catch (err) {
    console.error("The automated release failed with %O", err);
}
