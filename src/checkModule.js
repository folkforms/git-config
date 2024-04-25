const checkModule = (configToApply, gitUtils, shell, dryRun) => {
  const globalConfig = convertToObjects(gitUtils.getGlobalConfig());
  const localConfig = convertToObjects(gitUtils.getLocalConfig());
  console.log(`globalConfig = ${JSON.stringify(globalConfig)}`);
  console.log(`localConfig = ${JSON.stringify(localConfig)}`);
  const mergedConfig = { ...globalConfig, ...localConfig };
  console.log(`mergedConfig = ${JSON.stringify(mergedConfig)}`);

  const configToApplyAsObjects = convertToObjects(configToApply);
  console.log(
    `configToApplyAsObjects = ${JSON.stringify(configToApplyAsObjects)}`,
  );

  Object.keys(configToApplyAsObjects).forEach((key) => {
    if (mergedConfig[key] !== configToApplyAsObjects[key]) {
      shell.echo(`git config ${key} ${configToApplyAsObjects[key]}`);
    }
  });
};

const convertToObjects = (arr) => {
  const out = {};
  arr.forEach((item) => {
    const equalsIndex = item.indexOf("=");
    const key = item.substring(0, equalsIndex);
    const value = item.substring(equalsIndex + 1);
    out[key] = value;
  });
  return out;
};

module.exports = checkModule;
