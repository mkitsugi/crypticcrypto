const { exec } = require("child_process");

const runPythonScript = (scriptPath: string, args: string) => {
  return new Promise((resolve, reject) => {
    const command = `python3 ${scriptPath} ${args}`;

    exec(command, (error: Error, stdout: string, stderr: string) => {
      if (error) {
        console.error(`Error executing Python script: ${error}`);
        reject(error);
      } else {
        console.log(`Python script output: ${stdout}`);
        resolve(stdout);
      }
    });
  });
};
