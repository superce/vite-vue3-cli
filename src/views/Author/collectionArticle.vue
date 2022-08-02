<template>
  <div class="page">
    <div class="header">
      <el-form>
        <el-form-item>
          <el-select v-model="param.platform" @change="getList" class="m-2 platform" placeholder="博主来源" clearable>
            <el-option v-for="item in platformId" :key="item.name" :label="item.platform" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="param.authorName" @keyup.enter="getList" placeholder="博主名称" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="param.title" @keyup.enter="getList" placeholder="文章标题" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.state" @change="getList" class="m-2 platform" placeholder="使用状态" clearable>
            <el-option label="文章入库" :value="0" />
            <el-option label="已解析内容" :value="1" />
            <el-option label="图片本地化" :value="2" />
            <el-option label="已合成封面" :value="3" />
            <el-option label="下载内容失败" :value="-1" />
            <el-option label="图片本地化失败" :value="-2" />
            <el-option label="合成封面失败" :value="-3" />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="getList">查询</el-button>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" stripe style="width: 100%" height="calc(100% - 130px)">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="Title" label="文章标题" width="400"></el-table-column>
      <el-table-column label="博主名称" prop="AuthorName" width="150"></el-table-column>
      <el-table-column prop="Postdate" label="发布时间" width="180">
        <template #default="{row}">
            {{dateFormat(row.Postdate)}}
        </template>
      </el-table-column>
      <el-table-column prop="Gatherdate" label="采集时间" width="180">
        <template #default="{row}">
            {{dateFormat(row.Gatherdate)}}
        </template>
      </el-table-column>
      <el-table-column prop="StateString" label="状态" width="180" />
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="onLink(row)" size="small">原链接</el-button>
          <el-button v-if="row.State < 0" type="primary" @click="onReset(row)" size="small" :loading="resetLoading">重试</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="display: flex; align-items: center;">
      <page-nation :total="count" :pageSize="param.ps" :currentPage="param.pi" @childSizeChange="onSizeChange" @childCurrentChange="onCurrentChange"></page-nation>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { onMounted, reactive, ref } from "vue-demi";
import { useRoute } from 'vue-router'
import S from './api/article'
import { platformId } from '@/utils/authPlatform'
import { dateFormat } from '@/utils/formatTime'
import pageNation from '@/components/pagination/index.vue'
import Tip from "@/utils/Tip";
const route = useRoute()
onMounted(() => {
  param.authorName = route.query?.Name || ''
  getList()
})
const param = reactive({
    platform: '',
    authorName: '',
    title: '',
    state: '',
    pi: 1,
    ps: 20
})
const count = ref(0)
const list = ref([])
const loading = ref(false)
async function getList(){
    loading.value = true
    try{
        const { Data, total } = await S.apiCollectionAuthor(param)
        count.value = total
        list.value = Data
    }catch(err){}
    loading.value = false
}
// 分页
function onSizeChange(v) {
  param.ps = v
  getList()
}
function onCurrentChange(v) {
  param.pi = v
  getList()
}
const resetLoading = ref(false)
async function onReset({id}){
  resetLoading.value = true
  try{
    const { Message } = await S.apiReset({id})
    Tip.successMsg(Message)
    getList()
  }catch(err){}
  resetLoading.value = false
}
function onLink({Url}){
    window.open(Url, '_blank')
}
</script>
