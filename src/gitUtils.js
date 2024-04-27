const shelljs = require("shelljs");

const gitUtils = {
  getLocalConfig: () =>
    shelljs.exec(`git config --local --list`, { silent: true }).stdout,
  getGlobalConfig: () =>
    shelljs.exec(`git config --global --list`, { silent: true }).stdout,
  getRemoteUrl: () => {
    const url = shelljs.exec(`git remote get-url --push origin`, {
      silent: true,
    }).stdout;
    return url.substring(0, url.length - 1);
  },
};

module.exports = gitUtils;
