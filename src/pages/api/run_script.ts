import { NextApiRequest, NextApiResponse } from "next";
const { exec } = require("child_process");

const runPythonScript = (scriptPath: string, args: string) => {
  return new Promise((resolve, reject) => {
    const command = `python3 ${scriptPath} ${args}`;
    console.log(command);

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

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { scriptPath, args } = req.body;

  try {
    const result = await runPythonScript(scriptPath, args);
    res.status(200).json({ result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error executing Python script" });
  }
};
