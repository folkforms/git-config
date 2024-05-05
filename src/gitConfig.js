const fs = require("fs");

const gitConfig = (options, gitUtils, shell, actionModule) => {
  if (!options.debug) {
    console.debug = () => {};
  }
  const config = JSON.parse(fs.readFileSync(options.configFile, "utf8"));
  console.debug(`config = ${JSON.stringify(config)}`);

  let url = gitUtils.getRemoteUrl();
  if (options.usePath) {
    url = process.cwd().replaceAll("\\", "/");
  }
  console.debug(`url = ${url}`);

  const foundTypes = [];
  config.patternMatching.forEach((item) => {
    item.patterns.forEach((pattern) => {
      if (url.match(pattern)) {
        foundTypes.push(item.type);
      }
    });
  });
  console.debug(`foundTypes = ${JSON.stringify(foundTypes)}`);

  const globalConfigToApply = config.config.filter(
    (item) => item.type === "global",
  )[0].settings;
  console.debug(`globalConfigToApply = ${JSON.stringify(globalConfigToApply)}`);

  let localConfigToApply = [];
  config.config.forEach((item) => {
    if (foundTypes.includes(item.type)) {
      localConfigToApply.push(item.settings);
    }
  });
  localConfigToApply = localConfigToApply.flat();
  console.debug(`localConfigToApply = ${JSON.stringify(localConfigToApply)}`);

  actionModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    shell,
    options.dryRun,
    options.quiet,
  );
};

module.exports = gitConfig;
