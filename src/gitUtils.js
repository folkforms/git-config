const shelljs = require("shelljs");

const gitUtils = {
  getLocalConfig: () => shelljs.exec(`git config --local --list`).stdout,
  getGlobalConfig: () => shelljs.exec(`git config --global --list`).stdout,
  getRemoteUrl: () => {
    const url = shelljs.exec(`git remote get-url --push origin`).stdout;
    return url.substring(0, url.length - 1);
  },
};

module.exports = gitUtils;
