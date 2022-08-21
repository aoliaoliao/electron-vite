<script lang="ts">
export default { name: "LayoutIndex" };
</script>

<script setup lang="ts">
import { ref } from "vue";
import { IFileContent, IFileTree } from "./controller/fileController";
import sidebar from "./sidebar.vue";
import content from './content.vue'
import Header from './header.vue'


const fileContent = ref<IFileTree>()
const getFileContent = (file: IFileTree) => {
  fileContent.value = file
}

</script>

<template>
  <el-container style="height: 100%;">
    <el-header>
      <Header class="layout-header--wrap"></Header>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <sidebar @select-file="getFileContent" />
      </el-aside>
      <el-container>
        <el-main>
          <content class="layout-content--wrap" :data="fileContent"></content>
        </el-main>
        <el-footer>
          footer 部分
        </el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<style lang="scss" scoped>
$header-height: 60px;
$footer-height: 60px;

.layout-header--wrap {
  height: $header-height;
}
</style>
