const colors = require("colors");

if (process.argv.length < 3) {
  console.log("Zbyt mało parametrów!".red);
} else {
  const [node, file, ...args] = process.argv;
  const output = args.join(" ");
  console.log(colors.rainbow(output));
}
