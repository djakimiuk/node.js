const fs = require("fs");
const yargs = require("yargs");

const addCommand = yargs
  .command({
    command: "add",
    describe: "Adds item to a list",
    handler: (argv) => {
      fs.writeFile("toDoList.txt", "\n" + argv._[1], { flag: "a" }, (error) => {
        if (error) {
          console.log(error);
        } else {
          console.log(`File written successfully!`);
        }
      });
    },
  })
  .parse();

module.exports.command = "add";
