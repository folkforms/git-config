const sharedModule = require("./sharedModule");

const checkModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  shell,
  dryRun,
  quiet,
) => {
  return sharedModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    (key, value, isGlobal, mergedConfigValue) => {
      shell.echo(
        `FAIL${isGlobal ? " (Global)" : ""}: Expected${isGlobal ? " global" : ""} ${key}=${value} but was ${key}=${mergedConfigValue}`,
      );
      return 1;
    },
    (key, value, isGlobal, quiet) => {
      if (!quiet) {
        shell.echo(`OK${isGlobal ? " (Global)" : ""}: ${key}=${value}`);
      }
      return 0;
    },
    true,
    dryRun,
    quiet,
  );
};

module.exports = checkModule;
