// const shelljs = require("shelljs");
const { Command, Option } = require("commander");
const gitConfig = require("./gitConfig");

const program = new Command();
program
  .option("-c, --check", "Check that repo settings are correct")
  .option("-a, --apply", "Apply settings to repo")
  .option("-v, --version", "Print version")
  .addOption(new Option("--test <config-file>").hideHelp())
  .parse();

const options = {};
options.action = "check";
if (program.opts().apply) {
  options.action = "apply";
}
options.configFile =
  program.opts().test || "/c/dev/tools/git-config/git-config.js";

gitConfig(options);
