const dummyGitUtils = require("./dummyGitUtils");
const gitConfig = require("../src/gitConfig");

test("it matches repo patterns", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });
  const testModule = (globalConfigToApply, localConfigToApply) => {
    expect(globalConfigToApply.length).toEqual(3);
    expect(localConfigToApply.length).toEqual(4);
    expect(globalConfigToApply).toEqual([
      "alias.amend=commit --amend --no-edit",
      "alias.cb=checkout -b",
      "alias.signed=log -s --show-signature -1",
    ]);
    expect(localConfigToApply).toEqual([
      "user.name=MyCompanyUserName",
      "user.email=mycompanyemail@company.com",
      "user.signingkey=SomeSigningKey",
      "commit.gpgsign=true",
    ]);
  };

  gitConfig(
    { configFile: "./test/test-git-config.json" },
    gitUtils,
    null,
    testModule,
  );
});
