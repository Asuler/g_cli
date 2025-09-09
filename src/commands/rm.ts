import { Command } from "commander";
import { rimrafSync } from "rimraf";

const rmCommand = new Command("rm");

rmCommand
  .description("删除文件")
  .argument("<paths...>", "多个文件用空格分割")
  .action((paths: string[]) => {
    if (paths.some((p) => p === "/")) {
      console.log("不能删除根目录");
      return;
    }
    paths.forEach((path) => {
      rimrafSync(path);
    });
    console.log("删除成功");
  });

export default rmCommand;
