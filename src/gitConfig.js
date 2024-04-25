const gitConfig = (options, gitUtils, shelljs) => {
  console.log("gitConfig");

  // FIXME Inputs: options (config file, action), shell
  console.log(`options = ${JSON.stringify(options)}`);

  const config = require(options.configFile);
  console.log(`config = ${JSON.stringify(config)}`);

  const remoteUrl = gitUtils.getRemoteUrl();
  console.log(`remoteUrl = ${remoteUrl}`);

  const foundTypes = [];
  config.patternMatching.forEach((item) => {
    item.patterns.forEach((pattern) => {
      if (remoteUrl.match(pattern)) {
        foundTypes.push(item.type);
      }
    });
  });
  console.log(`foundTypes = ${foundTypes}`);

  // FIXME Outputs:
  // ...
};

module.exports = gitConfig;
