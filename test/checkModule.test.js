const { dummyShellJs } = require("dummy-shells");
const dummyGitUtils = require("./dummyGitUtils");
const checkModule = require("../src/checkModule");

test("it does nothing when settings are already correct globally and local setting is not set", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["user.name=CorrectUsername"],
    localConfig: [],
  });
  const globalConfigToApply = [];
  const localConfigToApply = ["user.name=CorrectUsername"];
  checkModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
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
  const globalConfigToApply = [];
  const localConfigToApply = ["user.name=CorrectUsername"];
  checkModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([]);
});

test("it prints an error when local settings are not correct", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["user.name=ArbitraryUserName"],
    localConfig: ["user.name=WrongUsername"],
  });
  const globalConfigToApply = [];
  const localConfigToApply = ["user.name=MyCompanyUserName"];
  checkModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([
    "FAIL: Expected user.name=MyCompanyUserName but was user.name=WrongUsername",
  ]);
});

test("it prints an error when global settings are not correct", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: ["alias.cb=IncorrectValue"],
    localConfig: [],
  });
  const globalConfigToApply = ["alias.cb=checkout -b"];
  const localConfigToApply = [];
  checkModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([
    "FAIL: Expected alias.cb=checkout -b but was alias.cb=IncorrectValue",
  ]);
});

test("it prints an error when a local setting that should be unset is set", () => {
  dummyShellJs._clear();
  const gitUtils = dummyGitUtils({
    globalConfig: [],
    localConfig: ["user.signingkey=ShouldBeUnset"],
  });
  const globalConfigToApply = [];
  const localConfigToApply = ["user.signingkey="];
  checkModule(globalConfigToApply, localConfigToApply, gitUtils, dummyShellJs);
  expect(dummyShellJs.echoList).toEqual([
    "FAIL: Expected user.signingkey= but was user.signingkey=ShouldBeUnset",
  ]);
});
