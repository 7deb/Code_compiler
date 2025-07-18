import { spawn } from "child_process";
import fs from "fs";
import path from "path";


const getdockerExtension = async (language: string) => {
    switch (language) {
        case "cpp":
            return { dockerImage: "code_runner_cpp:latest", extension: ".cpp" };
        case "py":
            return { dockerImage: "code_runner_python:latest", extension: ".py" };
        default:
            throw new Error("Unsupported language");
    }
};

async function codeExecute(dockerImage: string,codefilePath: string,fileExtension: string,input: string) {
    const containerName = "code_runner";
    const fileName = `userCode${fileExtension}`;
    const usercodeFile = path.join("/app", fileName);
    const inputFile = "/app/input.txt";

    const inputFileHost = path.join(path.dirname(codefilePath), "input.txt");
    fs.writeFileSync(inputFileHost, input);

    let command;
    switch (fileExtension) {
        case ".cpp":
            command = `g++ ${usercodeFile} -o /tmp/a.out && /tmp/a.out < ${inputFile}`;
            break;
        case ".py":
            command = `python ${usercodeFile} < ${inputFile}`;
            break;
        default:
            throw new Error("Unsupported file extension");
    }

    return new Promise((resolve, reject) => {
        const dockerProcess = spawn("docker", ["run","--rm","--name",containerName,"-v",`${path.dirname(codefilePath)}:/app`,dockerImage,"bash","-c",command,]);

        let output = "";

        dockerProcess.stdout.on("data", (data) => {
            output += data.toString();
        });

        dockerProcess.stderr.on("data", (data) => {
            console.error(`Error from container ${containerName}: ${data.toString()}`);
            output += data.toString();
        });

        dockerProcess.on("close", (code) => {
            fs.unlinkSync(inputFileHost);
            if (code === 0) {
                resolve(output.trim());
            } else {
                reject(new Error(`Docker process exited with code ${code}: ${output}`));
            }
        });

        dockerProcess.on("error", (err) => {
            fs.unlinkSync(inputFileHost);
            reject(new Error(`Docker process error: ${err.message}`));
        });
    });
}

export const codeExecuter = async (code: string, language: string, input: string) => {
    const { dockerImage, extension } = await getdockerExtension(language);

    const fileName = `userCode${extension}`;
    const filepath = path.join(__dirname, fileName);

    try {
        fs.writeFileSync(filepath, code);
        const output = await codeExecute(dockerImage, filepath, extension, input);
        return { success: true, output };
    } catch (error: any) {
        return { success: false, error: error.message };
    } finally {
        fs.unlinkSync(filepath);
    }
};
