const gitUtils = ({ remoteUrl, localConfig, globalConfig }) => ({
  getLocalConfig: () => localConfig || "aaa\nbbb",
  getGlobalConfig: () => globalConfig || "ccc\nddd",
  getRemoteUrl: () => remoteUrl || "dummy-remote-url",
});

module.exports = gitUtils;
