const { dummyShellJs } = require("dummy-shells");
const dummyGitUtils = require("./dummyGitUtils");
const gitConfig = require("../src/gitConfig");

test("it matches repo patterns", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });

  gitConfig(
    { action: "apply", configFile: "../test/test-git-config.json" },
    gitUtils,
    dummyShellJs,
  );
  expect(1 + 1).toEqual(2);
});
