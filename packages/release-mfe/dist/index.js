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
        "@semantic-release/github",
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
    if (result) {
        const { lastRelease, commits, nextRelease, releases } = result;
        console.log(`Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`);
        if (lastRelease.version) {
            console.log(`The last release was "${lastRelease.version}".`);
        }
        for (const release of releases) {
            console.log(`The release was published with plugin "${release.pluginName}".`);
        }
    }
    else {
        console.log("No release published.");
    }
}
catch (err) {
    console.error("The automated release failed with %O", err);
}
