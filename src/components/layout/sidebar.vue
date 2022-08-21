<template>
  <el-button @click="openFolderDialog">选择文件夹</el-button>
  <input style="display: none;" type="file" ref="refFile" webkitdirectory directory @change="selectFile" />

  <el-tree :data="fileTreeData" :props="defaultProps" :highlight-current="true" @node-click="handleNodeClick" />

</template>

<script lang="ts">
export default { name: "LayoutSidebar" };
</script>

<script lang="ts" setup>
import { ipcRenderer } from 'electron'
import { onMounted, ref, reactive, shallowRef } from 'vue';
import FilesController, { IFileContent, IFileTree } from './controller/fileController'
import path from 'path'

const defaultProps = {
  children: 'children',
  label: 'name',
}

const fileTreeData = ref<IFileTree[]>([])
const filesController = new FilesController()
const refFile = ref()
const emit = defineEmits<{
  (e: 'selectFile', file: IFileTree): void
}>()

const openFolderDialog = () => {
  refFile.value.click()
}

const selectFile = async (event: any) => {
  const filePath = path.dirname(event.target.files[0].path)
  const temp = await filesController.getFileTree(filePath) ?? []
  fileTreeData.value = temp;
  refFile.value.value = ''
}


const handleNodeClick = async (data: IFileTree) => {
  console.log(data)
  if (data.isDir) {
    const children = await filesController.getFileTree(data.realPath)
    data.children = children

  } else {
    emit('selectFile', data)
  }

}

</script>
