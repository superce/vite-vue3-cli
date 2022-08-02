<template>
   <el-config-provider :locale="zhLocale">
    <div>
      <router-view></router-view>
    </div>
   </el-config-provider>
</template>

<script setup lang="ts">
import { ElConfigProvider } from 'element-plus'
import zhLocale from 'element-plus/lib/locale/lang/zh-cn'
</script>

<style>
.element-plus-logo {
  width: 50%;
}
</style>
