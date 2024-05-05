const sharedModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  funcFailure,
  funcSuccess,
  dryRun = false,
  quiet = false,
) => {
  const globalConfig = convertToObjects(gitUtils.getGlobalConfig().split("\n"));
  const localConfig = convertToObjects(gitUtils.getLocalConfig().split("\n"));
  const mergedConfig = { ...globalConfig, ...localConfig };

  const globalConfigToApplyAsObjects = convertToObjects(globalConfigToApply);
  Object.keys(globalConfigToApplyAsObjects).forEach((key) => {
    let value = globalConfigToApplyAsObjects[key];
    if (mergedConfig[key] !== value) {
      funcFailure(key, value, true, mergedConfig[key], dryRun);
    } else {
      funcSuccess(key, value, true, quiet);
    }
  });

  const localConfigToApplyAsObjects = convertToObjects(localConfigToApply);
  Object.keys(localConfigToApplyAsObjects).forEach((key) => {
    let value = localConfigToApplyAsObjects[key];
    if (mergedConfig[key] !== value) {
      funcFailure(key, value, false, mergedConfig[key], dryRun);
    } else {
      funcSuccess(key, value, false, quiet);
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

module.exports = sharedModule;
