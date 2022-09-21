import path from "node:path";
import semanticRelease from "semantic-release";
import type { Options } from "semantic-release";

const packageJson = await import(
  path.resolve(process.cwd(), "./package.json"),
  { assert: { type: "json" } }
);

if (!packageJson) {
  throw new Error("[releaser]: unable to infer package name from package.json");
}

const config: Options = {
  extends: "semantic-release-monorepo",
  branches: [
    {
      name: "main",
      channel: "latest",
    },
  ],
  plugins: [
    "@semantic-release/commit-analyzer",
    "@semantic-release/release-notes-generator",
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
  tagFormat: `${packageJson.default.name}-v\${version}`,
};

try {
  const result = await semanticRelease(config);

  if (result) {
    const { lastRelease, commits, nextRelease, releases } = result;

    console.log(
      `Published ${nextRelease.type} release version ${nextRelease.version} containing ${commits.length} commits.`
    );

    if (lastRelease.version) {
      console.log(`The last release was "${lastRelease.version}".`);
    }

    for (const release of releases) {
      console.log(
        `The release was published with plugin "${release.pluginName}".`
      );
    }
  } else {
    console.log("No release published.");
  }
} catch (err) {
  console.error("The automated release failed with %O", err);
}

console.log("done");
