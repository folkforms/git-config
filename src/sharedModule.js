const _sharedModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  func,
) => {
  const globalConfig = convertToObjects(gitUtils.getGlobalConfig());
  const localConfig = convertToObjects(gitUtils.getLocalConfig());
  const mergedConfig = { ...globalConfig, ...localConfig };

  const globalConfigToApplyAsObjects = convertToObjects(globalConfigToApply);
  Object.keys(globalConfigToApplyAsObjects).forEach((key) => {
    if (mergedConfig[key] !== globalConfigToApplyAsObjects[key]) {
      let value = globalConfigToApplyAsObjects[key];
      func(key, value, true, mergedConfig[key]);
    }
  });

  const localConfigToApplyAsObjects = convertToObjects(localConfigToApply);
  Object.keys(localConfigToApplyAsObjects).forEach((key) => {
    if (mergedConfig[key] !== localConfigToApplyAsObjects[key]) {
      let value = localConfigToApplyAsObjects[key];
      func(key, value, false, mergedConfig[key]);
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

// FIXME Move these into their own files
const checkModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  shell,
) =>
  _sharedModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    (key, value, _, mergedConfigValue) => {
      shell.echo(
        `FAIL: Expected ${key}=${value} but was ${key}=${mergedConfigValue}`,
      );
    },
  );

const applyModule = (
  globalConfigToApply,
  localConfigToApply,
  gitUtils,
  shell,
) =>
  _sharedModule(
    globalConfigToApply,
    localConfigToApply,
    gitUtils,
    (key, value, isGlobal) => {
      if (key.startsWith("alias.")) {
        value = `"${value}"`;
      }
      shell.exec(`git config ${isGlobal ? "--global " : ""}${key} ${value}`);
    },
  );

module.exports = { checkModule, applyModule };
