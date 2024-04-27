const sharedModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  func,
  dryRun,
) => {
  const globalConfig = convertToObjects(gitUtils.getGlobalConfig());
  const localConfig = convertToObjects(gitUtils.getLocalConfig());
  const mergedConfig = { ...globalConfig, ...localConfig };

  const globalConfigToApplyAsObjects = convertToObjects(globalConfigToApply);
  Object.keys(globalConfigToApplyAsObjects).forEach((key) => {
    if (mergedConfig[key] !== globalConfigToApplyAsObjects[key]) {
      let value = globalConfigToApplyAsObjects[key];
      func(key, value, true, mergedConfig[key], dryRun);
    }
  });

  const localConfigToApplyAsObjects = convertToObjects(localConfigToApply);
  Object.keys(localConfigToApplyAsObjects).forEach((key) => {
    if (mergedConfig[key] !== localConfigToApplyAsObjects[key]) {
      let value = localConfigToApplyAsObjects[key];
      func(key, value, false, mergedConfig[key], dryRun);
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
