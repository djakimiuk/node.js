const yargs = require("yargs");

yargs.command(require("./add")).help().argv;
yargs.command(require("./list")).help().argv;
