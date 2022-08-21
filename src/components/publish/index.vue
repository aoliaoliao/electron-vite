<script setup lang="ts">
import api from '@/api/service'

function getPostList() {
  api.get('/wp-json/wp/v2/posts')
}

function publish () {
  api.post('/wp-json/wp/v2/posts', {
    title: 'test title ' + Math.random(),
    
  })
}



</script>

<template>
    <el-button @click="getPostList">
        获取文章
    </el-button>

    <el-button @click="publish">
        发布
    </el-button>
</template>
