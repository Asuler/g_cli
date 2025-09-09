import { Command } from 'commander';
import getAllLocalIPs from '../utils/getAllLocalIPs.js';

const ipCommand = new Command('ip');

ipCommand.description('获取本机 IP 地址').action(async (options) => {
  console.log(getAllLocalIPs());
});

// // 添加一个列出所有网卡的子命令
// ipCommand
//   .command('list')
//   .description('列出本机所有网络接口')
//   .action(() => {
//     console.log(getAllLocalIPs());
//   });

export default ipCommand;
