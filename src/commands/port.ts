import { Command } from "commander";
import { exec } from "child_process";
import os from "os";

const program = new Command("port");

program
  .argument("<port>")
  .description("查看占用指定端口的进程")
  .action((port) => {
    const platform = os.platform();

    if (platform === "win32") {
      // Windows
      exec(`netstat -ano | findstr :${port}`, (err, stdout) => {
        if (err || !stdout) {
          console.log(`端口 ${port} 没有被占用`);
          return;
        }

        const lines = stdout.trim().split("\n").filter(Boolean);
        const pids = new Set();
        lines.forEach((line) => {
          const parts = line.trim().split(/\s+/);
          const pid = parts[parts.length - 1];
          pids.add(pid);
        });

        pids.forEach((pid) => {
          exec(`tasklist /FI "PID eq ${pid}"`, (err, taskStdout) => {
            if (!err && taskStdout) {
              console.log(`PID: ${pid}`);
              console.log(taskStdout.trim());
            }
          });
        });
      });
    } else {
      // macOS / Linux
      exec(`lsof -i :${port} -sTCP:LISTEN -n -P`, (err, stdout) => {
        if (err || !stdout) {
          console.log(`端口 ${port} 没有被占用`);
          return;
        }

        const lines = stdout.trim().split("\n");
        lines.slice(1).forEach((line) => {
          const parts = line.trim().split(/\s+/);
          const command = parts[0];
          const pid = parts[1];
          console.log(`进程名: ${command}  PID: ${pid}`);
        });
      });
    }
  });

export default program;
