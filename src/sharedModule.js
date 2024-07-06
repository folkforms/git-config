const sharedModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  funcFailure,
  funcSuccess,
  failOnIncorrectSetting = true,
  dryRun = false,
  quiet = false,
) => {
  const globalConfig = convertToObjects(gitUtils.getGlobalConfig().split("\n"));
  const localConfig = convertToObjects(gitUtils.getLocalConfig().split("\n"));
  const mergedConfig = { ...globalConfig, ...localConfig };

  const globalConfigToApplyAsObjects = convertToObjects(globalConfigToApply);

  const globalKeys = Object.keys(globalConfigToApplyAsObjects);
  for (let i = 0; i < globalKeys.length; i++) {
    const key = globalKeys[i];
    let value = globalConfigToApplyAsObjects[key];
    if (mergedConfig[key] !== value) {
      funcFailure(key, value, true, mergedConfig[key], dryRun);
      if (failOnIncorrectSetting) {
        return 1;
      }
    } else {
      funcSuccess(key, value, true, quiet);
    }
  }

  const localConfigToApplyAsObjects = convertToObjects(localConfigToApply);
  const localKeys = Object.keys(localConfigToApplyAsObjects);
  for (let i = 0; i < localKeys.length; i++) {
    const key = localKeys[i];
    let value = localConfigToApplyAsObjects[key];
    if (mergedConfig[key] !== value) {
      funcFailure(key, value, false, mergedConfig[key], dryRun);
      if (failOnIncorrectSetting) {
        return 1;
      }
    } else {
      funcSuccess(key, value, false, quiet);
    }
  }

  return 0;
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

module.exports = sharedModule;
