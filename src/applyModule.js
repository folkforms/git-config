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
      shell.exec(`git config ${isGlobal ? "--global " : ""}${key} ${value}`);
    },
  );

module.exports = applyModule;
