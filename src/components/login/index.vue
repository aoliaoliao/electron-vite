<script lang="ts">
export default { name: "LoginIndex" };
</script>

<script setup lang="ts">
import { ref, computed, reactive, defineEmits } from "vue";
import type { FormInstance } from 'element-plus'
import { token } from '@/api/index'
import { useUserStore } from '@/store'

const userStore = useUserStore()
const emit = defineEmits<{
  (e: 'login'): void
}>()


const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: ''
})
const rules = reactive({
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
})
const confirmLogin = () => {
  ruleFormRef.value?.validate((valid) => {
    if (valid) {
      token.createToken({
        username: ruleForm.username,
        password: ruleForm.password
      }).then(res => {
        userStore.saveToken(res.data.token)
        userStore.saveUserInfo({
          username: ruleForm.username,
          email: res.data.email
        })
        cancelLogin()
        emit('login')
      })
    }
  })

}
const cancelLogin = () => {
  toggleShowDialog()
}



let isShowDialog = ref(false)
const toggleShowDialog = () => {
  isShowDialog.value = !isShowDialog.value
}


defineExpose({
  toggleShowDialog
})

</script>


<template>
  <el-dialog v-model="isShowDialog">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" class="demo-ruleForm">
      <el-form-item label="账号" prop="username">
        <el-input v-model="ruleForm.username" type="input" autocomplete="off" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="confirmLogin">登录</el-button>
        <el-button @click="cancelLogin">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style lang="scss" scoped>
</style>