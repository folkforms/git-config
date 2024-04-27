const sharedModule = require("./sharedModule");

const applyModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  shell,
) =>
  sharedModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    (key, value, isGlobal) => {
      if (key.startsWith("alias.")) {
        value = `"${value}"`;
      }
      if (value) {
        shell.exec(`git config ${isGlobal ? "--global " : ""}${key} ${value}`);
      } else {
        shell.exec(`git config ${isGlobal ? "--global " : ""}unset ${key}`);
      }
    },
  );

module.exports = applyModule;
