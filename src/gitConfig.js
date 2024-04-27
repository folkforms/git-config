const fs = require("fs");

const gitConfig = (options, gitUtils, shell, actionModule) => {
  const config = JSON.parse(fs.readFileSync(options.configFile, "utf8"));
  const remoteUrl = gitUtils.getRemoteUrl();

  const foundTypes = [];
  config.patternMatching.forEach((item) => {
    item.patterns.forEach((pattern) => {
      if (remoteUrl.match(pattern)) {
        foundTypes.push(item.type);
      }
    });
  });

  const globalConfigToApply = config.config.filter(
    (item) => item.type === "global",
  )[0].settings;

  let localConfigToApply = [];
  config.config.forEach((item) => {
    if (foundTypes.includes(item.type)) {
      localConfigToApply.push(item.settings);
    }
  });
  localConfigToApply = localConfigToApply.flat();

  actionModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    shell,
    options.dryRun,
  );
};

module.exports = gitConfig;
