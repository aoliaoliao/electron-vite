

import { contextBridge, ipcRenderer, shell } from 'electron';
import { statSync } from 'fs';
import { readFile, readdir, stat } from 'fs/promises'
import path from 'path'

contextBridge.exposeInMainWorld('api', {
  fspReaddir: readdir,
  fspReadFile: readFile,
  fsStatSync: statSync,
  pathJoin: path.join
});
