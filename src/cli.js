const shelljs = require("shelljs");
const { dryRunShellJs } = require("dummy-shells");
const { Command, Option } = require("commander");
const gitConfig = require("./gitConfig");
const gitUtils = require("./gitUtils");

const program = new Command();
program
  .option("-c, --check", "Check that repo settings are correct")
  .option("-a, --apply", "Apply settings to repo")
  .option(
    "-n, --dry-run",
    "Print what commands would be run, without actually running anything",
  )
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
const shell = program.opts().dryRun ? dryRunShellJs : shelljs;

gitConfig(options, gitUtils, shell);
