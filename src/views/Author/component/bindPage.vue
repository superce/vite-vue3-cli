<template>
  <div class="add-page">
    <el-dialog v-model="modelDialog" :title="title" width="1200px" @closed="onCancle" @open="onOpen">
      <el-divider content-position="left">已绑定的专页</el-divider>
      <el-table v-loading="boundPageList.loading" :data="boundPageList.list" stripe style="width: 100%" height="260px">
        <el-table-column prop="Name" label="专页名称" width="180">
          <template #default="{ row }">
            <a :href="`https://www.facebook.com/${row.Pageid}`" target="_blank">{{ row.Name }}</a>
          </template>
        </el-table-column>
        <el-table-column prop="Pageid" label="专页ID" width="200" />
        <el-table-column label="操作">
          <template #default="{ row }">
            <el-button type="danger" @click="onBindPage(row)" size="small">解绑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-divider content-position="left">搜索专页</el-divider>
      <div class="page">
        <div class="header">
          <el-form @submit.prevent :inline="true">
            <el-form-item label="搜索专页ID">
              <el-input v-model="param.pageid" @keyup.enter="getList" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getList">查询</el-button>
            </el-form-item>
          </el-form>
        </div>
        <el-table v-loading="loading" :data="pageList" highlight-current-row @current-change="handleCurrentChange" stripe style="width: 100%" height="400px">
          <el-table-column prop="Name" label="专页名称" width="180" />
          <el-table-column prop="Pageid" label="专页ID" width="200" />
          <el-table-column label="操作">
            <template #default="{ row }">
              <el-button type="primary" size="small" :icon="row.Pageid === addPageId ? Check : ''">选择</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancle" size="large">关闭</el-button>
          <el-button type="primary" @click="onAddPage" size="large">确认保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import Service from '../api/index'
import axios from 'axios'
import tip from '@/utils/Tip'
import { getUserId } from '@/utils/storage'
import { Check } from '@element-plus/icons-vue'
import { platformName } from '@/utils/authPlatform'
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    default: '绑定专页'
  },
  author: {
    type: Object,
    default: {
      Pageid: 0,
      authorId: 0
    }
  }
})
const modelDialog = computed({
  get: () => props.modelValue,
  set: () => onCancle()
})
const userId = computed(() => getUserId())
const param = reactive({
  pageid: ''
})
const pageList = ref([])
const loading = ref(false)
const getList = async () => {
  if (!param.pageid) return
  loading.value = true
  try {
    const { Data } = await Service.apiSearchListItem(param)
    pageList.value = Data
  } catch (err) {}
  loading.value = false
}
const addPageId = ref('')
const setType = ref(1)
let addParam = {
  authorId: '', pageId: 0
}
const handleCurrentChange = (val) => {
  if (!val) return
  const { id, Pageid, Name } = val
  addPageId.value = Pageid
  addParam = {
    authorId: props.author.authorId,
    pageId: id
  }
}
const onAddPage = async () => {
  try {
    const data = boundPageList.list.length > 0
    if (data) {
      tip.warningMsg('已经绑定过专页')
      return
    }
    if(!addParam.pageId) {
      tip.warningMsg('请选择专页')
      return
    }
    await onApiAddPage(addParam)
    onCancle()
    addPageId.value = ''
    addParam = {id: 0, pageId: ''}
  } catch (err) {}
}
function onApiAddPage(param){
  return new Promise(async (resolve, reject) => {
    try{
      const { Message } = await Service.apiBindPage(param)
      tip.successMsg(Message)
      onRefresh()
      resolve()
    }catch(err){}
  })
}
// 已绑定的博主列表
const boundPageList = reactive({
  list: [],
  loading: false
})
const onOpen = () => {
  handleOpened()
}
// const
async function handleOpened() {
  const param = {id: props.author.Pageid}
  boundPageList.list = []
  boundPageList.loading = true
  try {
    const { Data } = await Service.apiBoundPage(param)
    if(Data) boundPageList.list.push(Data)    
  } catch (err) {}
  boundPageList.loading = false
}
// 解绑专页
const onBindPage = (row) => {
  const text = `确认解绑${row.Name}？`
  ElMessageBox.confirm(text, '警告', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    const param = {
      authorId: props.author.authorId,
      pageId: 0
    }
    await onApiAddPage(param)
    boundPageList.list = []
  }).catch(() => {})
}
const emits = defineEmits(['childClosePage', 'childRefresh'])
function onCancle() {
  param.pageid = ''
  pageList.value = []
  emits('childClosePage')
}
function onRefresh(){
  emits('childRefresh')
}
</script>

<style></style>
