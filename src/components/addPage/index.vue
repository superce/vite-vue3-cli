<template>
  <div class="add-page">
    <el-dialog v-model="modelDialog" :title="title" width="1200px" @closed="onCancle" @open="onOpen">
      <div class="page">
          <el-form @submit.prevent>
              <el-form-item label="授权账号名或邮箱">
                  <el-input v-model="param.account" @keyup.enter="getList"/>
              </el-form-item>
              <el-form-item>
                  <el-button type="primary" @click="getList">查询</el-button>
              </el-form-item>
          </el-form>
          <el-table v-loading="loading" :data="pageList" @select="onSelectItem" @select-all="onSelectAll" stripe style="width: 100%;height: 700px" height="calc(100% - 130px)">
            <el-table-column type="selection" width="55" />
            <el-table-column prop="Name" label="专页名称" width="180" />
            <el-table-column prop="Pagefbid" label="专页ID" />
        </el-table>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancle" size="large">关闭</el-button>
          <el-button type="primary" @click="onAddPage" size="large" :loading="addLoading">确认保存</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from "vue"
import Service from './api/index'
import axios from 'axios'
import tip from '@/utils/Tip'
import { getUserId }  from '@/utils/storage'
const props = defineProps({
    modelValue:{
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        default: '新增专页'
    }
})
const modelDialog = computed({
  get:() => props.modelValue,
  set: () => onCancle()
})
const userId = computed(() => getUserId())
const param = reactive({
  account: "",
  email: "",
  isuser: 1,
  pi: 1,
  ps: 9999
})
const onOpen = () => {
  pageList.value = []
  param.account = ''
  param.email = ''
}
const pageList = ref([])
const loading = ref(false)
const getList = async () => {
  if(!param.account) return
  param.email = ''
  if(param.account.includes('@')){
    param.email = param.account
    param.account = ''
  }
  loading.value = true
  axios.post('https://tool.anyelse.com/publish/getpagelist',param).then(res => {
    pageList.value = res.data.data
  }).catch(err =>{}).finally(() => loading.value = false)
}
const addParam = ref([])
const onSelectItem = (selection, row) => {
  let arr = []
  selection.forEach(item => {
    const token_status = item.State === -1 ? 1 : 0
    arr.push({
      page_id:item.Pagefbid,
      page_name: item.Name,
      token_status,
      token_account: item.Username,
      operator_id: userId.value
    })
  });
  addParam.value = arr
}
const onSelectAll = (selection) => {
  let arr = []
  selection.forEach(item => {
    const token_status = item.State === -1 ? 1 : 0
    arr.push({
      page_id:item.Pagefbid,
      page_name: item.Name,
      token_status,
      token_account: item.Username,
      operator_id: userId.value
    })
  });
  addParam.value = arr
}
const addLoading = ref(false)
const onAddPage = async () => {
  addLoading.value = true
  try{
    const res = await Service.apiAdd(addParam.value)
    onCancle()
    onRefresh()
    tip.successMsg(res.msg)
  }catch(err){}
  addLoading.value = false
}
const emits = defineEmits(['childClosePage', 'childRefreshAddPage'])
function onCancle () {
    emits('childClosePage')
}
function onRefresh(){
  emits('childRefreshAddPage')
}
</script>

<style>
</style>
