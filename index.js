#!/usr/bin/env node
console.log("hello,g!");

const program = require("commander");
const { rimrafSync } = require("rimraf");
const kill = require("kill-port");
const ip = require("ip");

program
  .command("rm")
  .description("删除文件")
  .argument("<paths...>", "多个文件用空格分割")
  .action(function (paths) {
    if (paths.some((path) => path === "/")) {
      console.log("不能删除根目录");
      return;
    }
    paths.forEach((path) => {
      rimrafSync(path);
    });
    console.log("删除成功");
  });

program
  .command("proxy")
  .description("开启/关闭shell代理")
  .action(function () {
    console.log("export a=1");
    console.log("echo $a");
    console.log("开启/关闭shell代理");
  });

program
  .command("kill")
  .argument("<port...>")
  .description("杀掉占用该端口的进程")
  .action(function (ports) {
    ports.forEach((port) => {
      kill(port, "tcp").then(console.log).catch(console.log);
    });
  });

program
  .command("ip")
  .description("获取用户当前的ip")
  .action(function () {
    console.log(ip.address());
  });

// 这句话必须要加，否则无法进入action
program.parse(process.argv);
