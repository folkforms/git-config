const gitUtils = ({ remoteUrl }) => ({
  getBranch: () => "dummy-branch",
  getRemoteUrl: () => remoteUrl || "dummy-remote-url",
  getRepoUrl: () => "dummy-repo-url",
  getCommitForBranch: (branch) => (branch === "main" ? "1aabbcc" : "2ddeeff"),
  getMainBranchName: () => "main",
  getRemoteName: () => "git@github.com:folkforms/prx.git",
});

module.exports = gitUtils;
