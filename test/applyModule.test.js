const { dummyShellJs } = require("dummy-shells");
const dummyGitUtils = require("./dummyGitUtils");
const applyModule = require("../src/applyModule");

test("it does nothing when settings are already correct globally and local setting is not set", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["user.name=CorrectUsername"],
    localConfig: [],
  });
  const globalConfigToApply = [];
  const localConfigToApply = ["user.name=CorrectUsername"];
  applyModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.execList).toEqual([]);
});

test("it does nothing when settings are already correct locally", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: [
      "user.name=IncorrectUsernameButItWillBeIgnoredDueToCorrectLocalUsername",
    ],
    localConfig: ["user.name=CorrectUsername"],
  });
  const globalConfigToApply = [];
  const localConfigToApply = ["user.name=CorrectUsername"];
  applyModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.execList).toEqual([]);
});

test("it runs the correct command when local settings are not correct", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["user.name=ArbitraryUserName"],
    localConfig: ["user.name=WrongUsername"],
  });
  const globalConfigToApply = [];
  const localConfigToApply = ["user.name=MyCompanyUserName"];
  applyModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.execList).toEqual([
    "git config user.name MyCompanyUserName",
  ]);
});

test("it the correct command when global settings are not correct", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["alias.cb=IncorrectValue"],
    localConfig: [],
  });
  const globalConfigToApply = ["alias.cb=checkout -b"];
  const localConfigToApply = [];
  applyModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.execList).toEqual([
    'git config --global alias.cb "checkout -b"',
  ]);
});
