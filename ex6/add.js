const fs = require("fs");
const yargs = require("yargs");
const fileName = "toDoList.txt";

const addCommand = yargs
  .command({
    command: "add",
    describe: "Adds item to a list",
    handler: (argv) => {
      if (argv._.length < 2) {
        console.log(`You need to specify the name of the activity!`);
        return;
      }
      fs.readFile(fileName, "utf-8", (error, data) => {
        if (error) {
          fs.writeFile(
            fileName,
            "To do list:" + "\n" + argv._[1],
            { flag: "a" },
            (error) => {
              if (error) {
                console.log(error);
              } else {
                console.log(`File written successfully!`);
              }
            }
          );
          return;
        } else {
          console.log(argv._.length);
          fs.writeFile(fileName, "\n" + argv._[1], { flag: "a" }, (error) => {
            if (error) {
              console.log(error);
            } else {
              console.log(`File written successfully!`);
            }
          });
          return;
        }
      });
    },
  })
  .parse();

module.exports.command = "add";
