const sharedModule = require("./sharedModule");

const checkModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  shell,
  dryRun,
  quiet,
) =>
  sharedModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    (key, value, isGlobal, mergedConfigValue) => {
      shell.echo(
        `FAIL: Expected${isGlobal ? " global" : ""} ${key}=${value} but was ${key}=${mergedConfigValue}`,
      );
    },
    (key, value, isGlobal, quiet) => {
      if (!quiet) {
        shell.echo(`OK${isGlobal ? " (Global)" : ""}: ${key}=${value}`);
      }
    },
    dryRun,
    quiet,
  );

module.exports = checkModule;
