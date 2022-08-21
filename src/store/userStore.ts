import { defineStore } from 'pinia'
import { ref, reactive } from 'vue'
import { token as tokenHttp } from '@/api'

const token_key = 'wordpress_user_login_token'
const userinfo_key = 'wordpress_user_info'

export interface IUserInfo {
  email: string,
  username: string
}

export default defineStore('user', () => {

  const tokenData = ref('')
  const userInfo = ref<IUserInfo>({
    email: '',
    username: ''
  })

  function getToken() {
    return tokenData.value || localStorage.getItem(token_key)
  }

  function saveToken(token: string) {
    tokenData.value = token
    localStorage.setItem(token_key, token)
  }

  function removeToken() {
    tokenData.value = ''
    localStorage.removeItem(token_key)
  }

  function saveUserInfo(data: IUserInfo) {
    userInfo.value = data
    localStorage.setItem(userinfo_key, JSON.stringify(userInfo.value))
  }

  function remvoeUserInfo() {
    userInfo.value = {
      email: '',
      username: ''
    }
    localStorage.removeItem(userinfo_key)
  }

  return {
    userInfo,
    saveUserInfo,
    remvoeUserInfo,
    getToken,
    saveToken,
    removeToken
  }





})