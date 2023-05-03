const yargs = require("yargs");
const fs = require("fs");
const argv = require("yargs").argv;
yargs.command(require("./add")).help().argv;
yargs.command(require("./list")).help().argv;
if (argv._.length === 0) {
  console.log(`No arguments specified! You should run the program like in the example below:
  node ex6.js add activity <--- command adds activity to the list
  node ex6.js list <--- command lists all activities on the list`);
}
