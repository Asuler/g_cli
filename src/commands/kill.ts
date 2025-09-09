import { Command } from "commander";
import killPort from "kill-port";

const killCommand = new Command("kill");

// 杀端口命令
killCommand
  .argument("<port...>", "一个或多个端口")
  .description("杀掉占用该端口的进程")
  .action((ports: string[]) => {
    ports.forEach((port) => {
      // kill-port 返回 Promise
      killPort(+port, "tcp")
        .then(() => console.log(`已杀死端口 ${port} 的进程`))
        .catch((err: Error) =>
          console.error(`端口 ${port} 处理失败: ${err.message}`)
        );
    });
  });

export default killCommand;
