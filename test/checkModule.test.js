const { dummyShellJs } = require("dummy-shells");
const dummyGitUtils = require("./dummyGitUtils");
const checkModule = require("../src/checkModule");

test("it calls shell with the input commands", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({ remoteUrl: "company-internal/foo.git" });
  const settings = ["xxx", "yyy"];
  checkModule(settings, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual(settings);
});
