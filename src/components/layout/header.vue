<template>
  <el-row class="header--wrap">
    <el-col :span="12"></el-col>
    <el-col :span="12" style="text-align: right;">
      <el-button v-if="!isLogin" @click="handleLogin">登录</el-button>
      <el-avatar v-else :size="50" :icon="UserFilled" />
      <el-button @click="handleLogout">退出</el-button>
    </el-col>

    <LoginComponent ref="loginRef" />
  </el-row>

</template>

<script lang="ts">
export default { name: "LayoutHeaderx" };
</script>

<script lang="ts" setup>
import { UserFilled } from '@element-plus/icons-vue'
import LoginComponent from '../login/index.vue'
import { useUserStore } from '@/store'
import { ref, computed } from 'vue';
import { token } from '@/api'

const userStore = useUserStore()

const isLogin = computed(() => !!userStore.getToken())

const loginRef = ref<InstanceType<typeof LoginComponent> | null>(null)
const handleLogin = () => {
  loginRef.value?.toggleShowDialog()
}
const handleLogout = () => {
  userStore.removeToken()
  userStore.remvoeUserInfo()
}
</script>

<style lang="scss" scoped>
</style>



