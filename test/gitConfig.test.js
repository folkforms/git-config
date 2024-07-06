const dummyGitUtils = require("./dummyGitUtils");
const gitConfig = require("../src/gitConfig");

const testModule = (globalConfigToApply, localConfigToApply) => {
  expect(globalConfigToApply.length).toEqual(3);
  expect(localConfigToApply.length).toEqual(4);
  expect(globalConfigToApply).toEqual([
    "alias.amend=commit --amend --no-edit",
    "alias.cb=checkout -b",
    "alias.signed=log -s --show-signature -1",
  ]);
  expect(localConfigToApply).toEqual([
    "user.name=My Company User Name",
    "user.email=mycompanyemail@company.com",
    "user.signingkey=SomeSigningKey",
    "commit.gpgsign=true",
  ]);
};

test("it matches repo patterns", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });

  gitConfig(
    { configFile: "./test/test-git-config.json", useRemote: true },
    gitUtils,
    null,
    testModule,
  );
});

test("it matches paths", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "this-is-not-used" });
  gitConfig(
    { configFile: "./test/test-git-config.json" },
    gitUtils,
    null,
    testModule,
  );
});
