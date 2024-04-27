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
    (key, value, _, mergedConfigValue) => {
      shell.echo(
        `FAIL: Expected ${key}=${value} but was ${key}=${mergedConfigValue}`,
      );
    },
    (key, value, quiet) => {
      if (!quiet) {
        shell.echo(`OK: ${key}=${value}`);
      }
    },
    dryRun,
    quiet,
  );

module.exports = checkModule;
