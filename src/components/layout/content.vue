<template>
  <div class="content--wrap">
    <div class="header">
      <el-button type="primary" @click="handlePublish">发布</el-button>
    </div>
    <Markdown class="content" :value="fileContent.content"></Markdown>

    <el-dialog v-model="isShowDialog" title="发布文章" width="30%" :before-close="handleClose">
      <span>This is a message</span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancelPublish">取消</el-button>
          <el-button type="primary" @click="confirmPublish">发布</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
export default { name: "LayoutContent" };
</script>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue'
import FilesController, { IFileContent, IFileTree } from './controller/fileController'
import Markdown from '../markdown/index.vue'
import { posts } from '@/api'


const props = defineProps<{
  data: IFileTree | undefined
}>()

const filesController = new FilesController()
let fileContent = ref<IFileContent>({
  name: '',
  realPath: '',
  content: ''
})
watch(() => props.data?.realPath, async (newVal, oldVal) => {
  if (!newVal) return
  const content = await filesController.getFileContent(newVal)

  fileContent.value = {
    name: props.data?.name || '',
    realPath: props.data?.realPath ?? '',
    content: content
  }

  console.log('fileContent.value', fileContent, fileContent.value, fileContent.value.content)
})

onMounted(() => {
})

// 发布文章
enum EPostStatus {
  publish = 'publish',
  future = 'future',
  draft = 'draft',
  pending = 'pending',
  private = 'private'
}
let isShowDialog = ref(false)
const handlePublish = () => {
  isShowDialog.value = true
}
const handleClose = (done: () => void) => {
  done()
}
const confirmPublish = () => {

  posts.create({
    title: `post-api-${new Date()}`,
    content: '',
    status: EPostStatus.publish
  })
}
const cancelPublish = () => {
  isShowDialog.value = false
}




</script>

<style lang="scss">
$header-height: 60px;

.content--wrap {
  width: 100%;
  height: 100%;
  position: relative;

  .header {
    height: $header-height;
    display: flex;
    align-items: center;
  }

  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: $header-height;
    bottom: 0;
    border: 1px solid #ccc;
  }
}
</style>