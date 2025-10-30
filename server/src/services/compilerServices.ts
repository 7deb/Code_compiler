import { spawn } from "child_process";
import fs from "fs";
import path from "path";

const BASE_EXEC_PATH = path.resolve(process.cwd(), "code-execution-temp");

const getDockerExtension = async (language: string) => {
  switch (language) {
    case "cpp":
      return { dockerImage: "code_runner_cpp:latest", extension: ".cpp" };
    case "py":
      return { dockerImage: "code_runner_python:latest", extension: ".py" };
    default:
      throw new Error("Unsupported language");
  }
};

async function codeExecute(dockerImage: string,filePath: string,fileExtension: string,input: string): Promise<string> {
  const fileName = `userCode${fileExtension}`;
  const inputFileHost = path.join(path.dirname(filePath), "input.txt");
  const usercodeFile = path.join("/app", fileName);
  const inputFile = "/app/input.txt";
  const outputFile = "/tmp/user_code_output";

  fs.writeFileSync(inputFileHost, input);

  let command;
  switch (fileExtension) {
    case ".cpp":
      command = `g++ ${usercodeFile} -o ${outputFile} && ${outputFile} < ${inputFile}`;
      break;
    case ".py":
      command = `python3 ${usercodeFile} < ${inputFile}`;
      break;
    default:
      throw new Error("Unsupported file extension");
  }

  console.log("Docker command:", command);
  // Debug: log where the file was written and whether it exists on the filesystem
  console.log("host file path:", filePath);
  console.log("file exists before docker run:", fs.existsSync(filePath));

  return new Promise((resolve, reject) => {
    // If a Docker volume name is provided via env (set in docker-compose),
    // mount the named volume instead of a host/container path. When the
    // server is running inside a container and uses the Docker socket,
    // mounting a container path as a host bind can fail because the daemon
    // interprets the path on the host, not inside this container. Using a
    // named volume avoids that mismatch.
    const dockerVolumeName = process.env.DOCKER_CODE_VOLUME_NAME;
    const mountSource = dockerVolumeName ? `${dockerVolumeName}:/app` : `${path.dirname(filePath)}:/app`;

    const dockerProcess = spawn("docker", ["run","--rm","-v",mountSource,dockerImage,"bash","-c",command,]);

    let output = "";

    dockerProcess.stdout.on("data", (data) => {
      output += data.toString();
    });

    dockerProcess.stderr.on("data", (data) => {
      output += data.toString();
    });

    dockerProcess.on("close", (code) => {
      fs.existsSync(inputFileHost) && fs.unlinkSync(inputFileHost);
      code === 0
        ? resolve(output.trim())
        : reject(new Error(`Docker exited with code ${code}: ${output}`));
    });

    dockerProcess.on("error", (err) => {
      fs.existsSync(inputFileHost) && fs.unlinkSync(inputFileHost);
      reject(new Error(`Docker error: ${err.message}`));
    });
  });
}


export const codeExecuter = async (code: string,language: string,input: string) => {
  const { dockerImage, extension } = await getDockerExtension(language);

  const filePath = path.join(BASE_EXEC_PATH, `userCode${extension}`);

  if (!fs.existsSync(BASE_EXEC_PATH)) {
    fs.mkdirSync(BASE_EXEC_PATH, { recursive: true });
  }

  try {
    fs.writeFileSync(filePath, code);
    const output = await codeExecute(dockerImage, filePath, extension, input);
    return { success: true, output };
  } catch (error: any) {
    return { success: false, error: error.message };
  } finally {
    fs.existsSync(filePath) && fs.unlinkSync(filePath);
  }
};
