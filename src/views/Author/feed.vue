<template>
   <div>
    <div class="header">
      <el-form @submit.native.prevent>
        <el-form-item>
          <el-input v-model="param.title" @keyup.enter="onChangeParam" placeholder="标题" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="param.authorName" @keyup.enter="onChangeParam" placeholder="博主名称" />
        </el-form-item>
        <el-form-item>
          <el-input v-model="param.PageName" @keyup.enter="onChangeParam" placeholder="专页名称" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.state" @change="onChangeParam" class="m-2 platform" placeholder="状态" clearable>
            <el-option label="初始" value="0" />
            <el-option label="发布中" value="1" />
            <el-option label="发布成功" value="2" />
            <el-option label="失败" value="-" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.type" @change="onChangeParam" class="m-2 platform" placeholder="类型" clearable>
            <el-option label="首发" value="1" />
            <el-option label="转帖" value="2" />
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="onChangeParam">查询</el-button>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="list" stripe style="width: 100%" height="calc(100% - 130px)">
      <el-table-column prop="Title" label="文章标题" width="400"></el-table-column>
      <el-table-column label="博主名称" prop="AuthorName" width="120"></el-table-column>
      <el-table-column label="专页" prop="PageName" width="150"></el-table-column>
      <el-table-column label="域名" prop="Host" width="150"></el-table-column>
      <el-table-column label="类型" prop="TypeString" width="100"></el-table-column>
      <el-table-column label="状态" prop="StateString" width="100">
        <template #default="{row}">
            <el-tag :type="onState(row.State)" effect="plain" class="mx-1" size="small">{{row.StateString}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="分享次数" prop="Sharecount" width="100"></el-table-column>
      <el-table-column label="点阅次数" prop="vc" width="100"></el-table-column>
      <el-table-column label="成效登记" prop="Level" width="100"></el-table-column>
      <el-table-column prop="Scheduledate" label="排期时间" width="180">
        <template #default="{row}">
            {{dateFormat(row.Scheduledate)}}
        </template>
      </el-table-column>
      <el-table-column label="最后分享时间" width="180">
        <template #default="{row}">
            {{dateFormat(row.Lastshare)}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="onLink(row)" size="small">原链接</el-button>
          <el-button type="primary" v-if="row.PostUrl" @click="onPostLink(row)" size="small">贴文链接</el-button>
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
import S from './api/feed'
import pageNation from '@/components/pagination/index.vue'
import { dateFormat } from '@/utils/formatTime'
onMounted(() => {
  getList()
})
const param = reactive({
    title: '',
    type: '',
    state: '',
    authorName: '',
    PageName: '',
    pi: 1,
    ps: 20
})
const count = ref(0)
const list = ref([])
const loading = ref(false)
async function getList(){
    loading.value = true
    try{
        const { Data, total } = await S.apiArtilceFeedList(param)
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
function onChangeParam(){
    param.pi = 1
    getList()
}
function onLink({Fullurl}){
    window.open(Fullurl, '_blank')
}
function onPostLink({PostUrl}){
    window.open(PostUrl, '_blank')
}
function onState(state){
    const s = new Map()
    s.set(0, 'info')
    s.set(1, 'warning')
    s.set(2, 'success')
    return s.get(state) || 'danger'
}
</script>
