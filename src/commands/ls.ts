import { Command } from 'commander';
import chalk from 'chalk';
import { Dirent, Stats } from 'fs';
import fs from 'fs';
import path from 'path';

const program = new Command('ls');

program
  .name('ls')
  .enablePositionalOptions()
  .description('用 Node.js 模拟 Linux ls 命令')
  .option('-l, --long', '长格式输出')
  .option('-a, --all', '显示隐藏文件（以 . 开头）')
  .option('-h, --human-readable', '可读性更好的文件大小')
  .option('-t', '按修改时间排序（最新在前）')
  .option('-r, --reverse', '反向排序')
  .argument('[dir]', '要列出的目录，默认为当前目录')
  .action((dir, options) => {
    console.log(dir, 'dir');
    const targetDir = path.resolve(process.cwd(), dir || '.');
    let files = fs.readdirSync(targetDir, { withFileTypes: true });

    // 过滤隐藏文件
    if (!options.all) {
      files = files.filter((file) => !file.name.startsWith('.'));
    }

    // 排序
    if (options.t) {
      files.sort((a, b) => {
        const aTime = fs.statSync(path.join(targetDir, a.name)).mtime.getTime();
        const bTime = fs.statSync(path.join(targetDir, b.name)).mtime.getTime();
        return bTime - aTime;
      });
    } else {
      files.sort((a, b) => a.name.localeCompare(b.name, 'en'));
    }

    if (options.reverse) {
      files.reverse();
    }

    // 输出
    if (options.long) {
      files.forEach((file) => {
        const stats = fs.statSync(path.join(targetDir, file.name));
        const size = options.humanReadable ? humanFileSize(stats.size) : stats.size;
        const mtime = stats.mtime.toISOString().slice(0, 19).replace('T', ' ');
        const typeFlag = file.isDirectory() ? 'd' : '-';
        console.log(`${typeFlag}\t${size}\t${mtime}\t${colorize(file, stats)}`);
      });
    } else {
      console.log(files.map((file) => colorize(file, fs.statSync(path.join(targetDir, file.name)))).join('\t'));
    }
  });

program.parse(process.argv);

// 文件大小换算
function humanFileSize(bytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = bytes;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)}${units[unitIndex]}`;
}

// 文件颜色规则
function colorize(file: Dirent, stats: Stats): string {
  let name = file.name;

  // 隐藏文件变灰色
  if (name.startsWith('.')) {
    name = chalk.gray(name);
  }
  // 文件夹蓝色
  else if (stats.isDirectory()) {
    name = chalk.blue(name);
  }
  // 可执行文件绿色（判断执行权限）
  else if (process.platform !== 'win32' && stats.mode & 0o111) {
    name = chalk.green(name);
  }
  // 普通文件默认
  else {
    name = chalk.white(name);
  }

  return name;
}

export default program;
