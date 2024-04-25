const dummyGitUtils = require("./dummyGitUtils");
const gitConfig = require("../src/gitConfig");

test("it matches repo patterns", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });
  const testModule = (settings) => {
    expect(settings.length).toEqual(6);
    expect(settings).toEqual([
      "alias.amend=commit --amend --no-edit",
      "alias.cb=checkout -b",
      "user.name=MyCompanyUserName",
      "user.email=mycompanyemail@company.com",
      "user.signingkey=SomeSigningKey",
      "commit.gpgsign=true",
    ]);
  };

  gitConfig(
    { configFile: "../test/test-git-config.json" },
    gitUtils,
    testModule,
  );
});
