#!/usr/bin/env node

const { Command, Option } = require("commander");
const shelljs = require("shelljs");
const gitConfig = require("./gitConfig");
const gitUtils = require("./gitUtils");
const applyModule = require("./applyModule");
const checkModule = require("./checkModule");

const program = new Command();
program
  .option("-c, --check", "Check that repo settings are correct")
  .option("-a, --apply", "Apply settings to repo")
  .option(
    "-n, --dry-run",
    "Print what commands would be run, without actually running anything",
  )
  .option("-q, --quiet", "Do not print success messages")
  .option("-v, --version", "Print version")
  .addOption(new Option("--test <config-file>").hideHelp())
  .parse();

const options = {};
options.dryRun = !!program.opts().dryRun;
options.quiet = !!program.opts().quiet;
options.configFile =
  program.opts().test || "c:/dev/tools/git-config/git-config.json";
const action = program.opts().apply ? applyModule : checkModule;

gitConfig(options, gitUtils, shelljs, action);
