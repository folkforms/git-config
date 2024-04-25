const { dummyShellJs } = require("dummy-shells");
const dummyGitUtils = require("./dummyGitUtils");
const checkModule = require("../src/checkModule");

test("it does nothing when settings are already correct globally and local setting is not set", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["user.name=CorrectUsername"],
    localConfig: [],
  });
  const configToApply = ["user.name=CorrectUsername"];
  checkModule(configToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([]);
});

test("it does nothing when settings are already correct locally", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: [
      "user.name=IncorrectUsernameButItWillBeIgnoredDueToCorrectLocalUsername",
    ],
    localConfig: ["user.name=CorrectUsername"],
  });
  const configToApply = ["user.name=CorrectUsername"];
  checkModule(configToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([]);
});

test("it prints an error when settings are not correct", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["user.name=ArbitraryUserName"],
    localConfig: ["user.name=WrongUsername"],
  });
  const configToApply = ["user.name=MyCompanyUserName"];
  checkModule(configToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([
    "git config user.name MyCompanyUserName",
  ]);
});
