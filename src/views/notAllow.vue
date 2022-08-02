<template>
  <div class="not-allow">
      <el-result icon="warning" title="警告" sub-title="无权限，请联系管理员" >
        <template #extra>
          <el-button type="primary" @click="onCancel">返回</el-button>
        </template>
      </el-result>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()
  function onCancel(){
    router.replace('/login')
  }
</script>

<style>
.not-allow{position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);}
</style>