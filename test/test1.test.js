const dummyGitUtils = require("./dummyGitUtils");
const gitConfig = require("../src/gitConfig");

test("it matches repo patterns", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });
  const testModule = (settings) => {
    expect(settings.length).toEqual(6);
  };

  gitConfig(
    { configFile: "../test/test-git-config.json" },
    gitUtils,
    testModule,
  );
});
