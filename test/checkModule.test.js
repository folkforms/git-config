const { dummyShellJs } = require("dummy-shells");
const dummyGitUtils = require("./dummyGitUtils");
const checkModule = require("../src/checkModule");

test("it runs", () => {
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });
  const settings = ["xxx", "yyy"];
  checkModule(settings, gitUtils, dummyShellJs);
});
