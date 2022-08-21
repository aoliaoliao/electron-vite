
import { ipcMain, dialog } from 'electron'
import fs from 'fs'
import { readFile, readdir, stat } from 'fs/promises'
import path from 'path'


interface IFileTree {
  isDir: boolean,
  name: string,
  realPath: string
}

const getFileTree = async (filePath: string): Promise<IFileTree[] | undefined> => {
  try {
    const fileList = await readdir(filePath, { encoding: 'utf-8' }) ?? []

    const fileTree: IFileTree[] = fileList.map(name => {
      const fileRealPath = path.join(filePath, name)
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
  }
}

ipcMain.on('file-open-directory-dialog', function (event, p) {
  console.log('event', event)
  console.log('p', p)
  dialog.showOpenDialog({
    properties: [p],
    title: '请选择保存目录',
    buttonLabel: '选择'
  }).then(async result => {

    const filePath = result.filePaths[0];
    console.log('filePath', filePath);
    const fileTree = await getFileTree(filePath);
    console.log('fileTree', fileTree);

    event.sender.send('selectedItem', fileTree)
  })
});

ipcMain.on('file-get-files-by-dir', function (event, p) {

})
