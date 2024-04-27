const sharedModule = require("./sharedModule");

const applyModule = (
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
    (key, value, isGlobal) => {
      if (key.startsWith("alias.")) {
        value = `"${value}"`;
      }
      const cmd = value
        ? `git config ${isGlobal ? "--global " : ""}${key} ${value}`
        : `git config ${isGlobal ? "--global " : ""}--unset ${key}`;
      if (!dryRun) {
        shell.exec(cmd);
      } else {
        shell.echo(`DRY RUN: ${cmd}`);
      }
    },
    (key, value, quiet) => {
      if (!quiet) {
        shell.echo(`OK: ${key}=${value}`);
      }
    },
    dryRun,
    quiet,
  );

module.exports = applyModule;
