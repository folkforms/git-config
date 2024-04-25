const gitConfig = (options, gitUtils, shell, actionModule) => {
  const config = require(options.configFile);
  const remoteUrl = gitUtils.getRemoteUrl();

  const foundTypes = [];
  config.patternMatching.forEach((item) => {
    item.patterns.forEach((pattern) => {
      if (remoteUrl.match(pattern)) {
        foundTypes.push(item.type);
      }
    });
  });

  let configToApply = [];
  config.config.forEach((item) => {
    if (foundTypes.includes(item.type)) {
      configToApply.push(item.settings);
    }
  });
  configToApply = configToApply.flat();

  actionModule(configToApply, gitUtils, shell, options.dryRun);
};

module.exports = gitConfig;
