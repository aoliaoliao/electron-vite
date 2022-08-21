import { readdir, readFile } from 'fs/promises';
import path from 'path';
import fs from 'fs';

export interface IFileTree {
  isDir: boolean,
  name: string,
  realPath: string,
  children?: IFileTree[]
}

export interface IFileContent {
  name: string,
  content: string,
  realPath: string,
}

export default class FilesController {
  async getFileTree(dirName: string): Promise<IFileTree[]> {
    try {
      const fileList: string[] = await readdir(dirName, { encoding: 'utf-8' }) ?? []

      const fileTree: IFileTree[] = fileList.map(name => {
        const fileRealPath = path.join(dirName, name)
        const isDir = fs.statSync(fileRealPath).isDirectory() ?? false
        return {
          isDir,
          name,
          realPath: fileRealPath
        }
      })

      return fileTree;
    } catch (err) {
      // TODO: 文件路径读取失败，给我弹框提示
      console.error(err);
      return []
    }
  }

  async getFileContent(fileName: string): Promise<string> {
    try {
      const content = await readFile(fileName, { encoding: 'utf-8' }) ?? ''

      return content

    } catch (error) {
      // TODO: 文件路径读取失败，给我弹框提示
      console.error(error);
      return ''
    }
  }
}