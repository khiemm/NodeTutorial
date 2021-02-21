const { spawn } = require("child_process");

// 1
// // const child = spawn("pwd");
// const child = spawn('find', ['.', '-type', 'f']);

// child.on("exit", function (code, signal) {
//   console.log(
//     "child process exited with " + `code ${code} and signal ${signal}`
//   );
// });

// child.stdout.on("data", (data) => {
//   console.log(`child stdout:\n${data}`);
// });

// child.stderr.on("data", (data) => {
//   console.error(`child stderr:\n${data}`);
// });

// 2
const child = spawn("wc"); // create a input mode

// pipe a readable stream into a writable stream
// take input of cmd as input of wc
process.stdin.pipe(child.stdin);

child.stdout.on("data", (data) => {
  console.log(`child stdout:\n${data}`);
});
// child.stdin, writable stream: got wrote input
// process.stdin, readable stream: Ctrl D to input done

// 3
// const find = spawn("find", [".", "-type", "f"]);
// const wc = spawn("wc", ["-l"]);

// // take output of find as input of wc
// find.stdout.pipe(wc.stdin);

// wc.stdout.on("data", (data) => {
//   console.log(`Number of files ${data}`);
// });
