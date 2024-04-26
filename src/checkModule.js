const sharedModule = require("./sharedModule");

const checkModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  shell,
) =>
  sharedModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    (key, value, _, mergedConfigValue) => {
      shell.echo(
        `FAIL: Expected ${key}=${value} but was ${key}=${mergedConfigValue}`,
      );
    },
  );

module.exports = checkModule;
