const checkModule = (configToApply, gitUtils, shell, dryRun) => {
  // Call shell with each configToApply
  configToApply.forEach((item) => {
    shell.echo(item);
  });
};

module.exports = checkModule;
