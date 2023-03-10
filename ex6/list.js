const fs = require("fs");
const yargs = require("yargs");
const fileName = "toDoList.txt";

const listCommand = yargs
  .command({
    command: "list",
    describe: "Lists item to a list",
    handler: (argv) => {
      fs.readFile(fileName, "utf-8", (error, data) => {
        if (error) {
          console.log(`There was an error: ${error}`);
        }
        console.log(data);
      });
    },
  })
  .parse();

module.exports.command = "list";
