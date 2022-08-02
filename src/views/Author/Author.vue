<template>
  <div class="auth-video">
    <div class="header">
      <el-form>
        <el-form-item>
          <el-select v-model="param.platform" @change="list" class="m-2 platform" placeholder="博主来源" clearable>
            <el-option v-for="item in platformId" :key="item.name" :label="item.platform" :value="item.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.state" @change="list" class="m-2 platform" placeholder="博主状态" clearable>
            <el-option label="禁用" :value="0" />
            <el-option label="启用" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.ispaged" @change="list" class="m-2 platform" placeholder="是否绑定专页" clearable>
            <el-option label="已绑定专页" :value="1" />
            <el-option label="未绑定专页" :value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input v-model="param.name" @keyup.enter="list" placeholder="博主名称" />
        </el-form-item>
        <el-form-item>
          <el-select v-model="param.cateid" @change="list" placeholder="分类" clearable>
            <el-option v-for="cate in cateList" :key="cate.id + 'cate'" :label="cate.Name" :value="cate.id"></el-option>
          </el-select>
        </el-form-item>
        <el-button type="primary" @click="list">查询</el-button>
        <el-button type="primary" @click="author.dialog = true">新增博主</el-button>
      </el-form>
    </div>
    <el-table v-loading="loading" :data="auth.list" stripe style="width: 100%" height="calc(100% - 130px)">
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="博主头像" width="100">
        <template #default="{ row }">
          <el-avatar :src="row.Pic" />
        </template>
      </el-table-column>
      <el-table-column label="博主名称" width="150">
        <template #default="{ row }">
          <p>{{ row.Name }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="Uid" label="博主ID" width="180" />
      <el-table-column prop="CateName" label="分类" width="120">
        <template #default="{ row }">
          <div class="categroy-edit">
            {{ row.CateName }}
            <i class="iconfont icon-tianxie" @click="doEditAuthorCate(row)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="CateName" label="域名" width="180">
        <template #default="{ row }">
          <div class="categroy-edit">
            {{ row.DomainHost }}
            <i class="iconfont icon-tianxie" @click="doEditAuthorDomain(row)"></i>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="来源" width="100">
        <template #default="{ row }">
          {{ platformName(row.Platform) }}
        </template>
      </el-table-column>
      <el-table-column prop="Artcount" label="待用文章数" width="100" />
      <el-table-column label="博主状态" width="100">
         <template #default="{ row }">
          <el-switch v-model="row.State" @change="onChangeState(row)" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949" :active-value="1" :inactive-value="0" />
        </template>
      </el-table-column>
      <el-table-column label="是否绑定专页" width="120">
        <template #default="{ row }">
          <el-tag :type="row.Pageid === 0 ? 'danger' : 'success'">{{row.Pageid === 0 ? '未绑定' : '已绑定'}}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="Createdate" label="创建时间" width="200">
        <template #default="{row}">
          {{dateFormat(row.Createdate)}}
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template #default="{ row }">
          <el-button type="primary" @click="onAddPage(row)" size="small">绑定专页</el-button>
          <el-button type="primary" @click="toArticleList(row)" size="small">查看文章</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="display: flex; align-items: center;">
      <page-nation :total="auth.total" :pageSize="param.ps" :currentPage="param.pi" @childSizeChange="onSizeChange" @childCurrentChange="onCurrentChange"></page-nation>
    </div>
    <el-dialog v-model="author.dialog" title="新增博主" width="600px" @close="handleClose">
      <div>
        <el-form ref="ruleFormRef" :inline="true" :model="author" :rules="rules" class="collection-author" label-position="left">
          <el-form-item label="博主地址" prop="url_str" class="collection-input">
            <el-input v-model="author.url_str" placeholder="填写或粘贴博主/内容地址" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :loading="addLoading" @click="onCommitCollection">采集</el-button>
          </el-form-item>
        </el-form>
        <!-- 博主信息 -->
        <el-descriptions title="博主信息" direction="vertical" border :column="4">
          <el-descriptions-item label="博主ID">{{addAuthorInfor.uid}}</el-descriptions-item>
          <el-descriptions-item label="头像">
            <el-avatar :size="50" :src="addAuthorInfor.pic" />
          </el-descriptions-item>
          <el-descriptions-item label="博主名称">{{addAuthorInfor.name}}</el-descriptions-item>
          <el-descriptions-item label="来源">{{platform(addAuthorInfor.platform)}}</el-descriptions-item>
        </el-descriptions>
        <el-form ref="cateFormRef" :model="addAuthorInfor" :rules="rules" label-width="120px" class="user-select-form" label-position="top">
          <el-form-item label="分类" prop="cateid">
            <el-select v-model="addAuthorInfor.cateid">
              <el-option v-for="cate in cateList" :key="cate.id + 'cate'" :label="cate.Name" :value="cate.id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="域名" prop="domainid">
            <el-select v-model="addAuthorInfor.domainid">
              <el-option v-for="h in domainList" :key="h.Host + 'domain'" :label="h.Host" :value="h.id"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="author.dialog = false">取消</el-button>
          <el-button type="primary" :loading="addAuthorLoading"  @click="onCommit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 修改列表分类 -->
    <el-dialog v-model="editListCate.dialog" title="编辑分类" width="400px" draggable>
      <el-select v-model="editListCate.cateId">
        <el-option v-for="cate in cateList" :key="cate.id + 'select-cate'" :label="cate.Name" :value="cate.id"></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editListCate.dialog = false">取消</el-button>
          <el-button type="primary" :loading="editListCate.loading" @click="onCommitEdit">确认</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="editDomain.dialog" title="编辑域名" width="400px" draggable>
      <el-select v-model="editDomain.Domainid">
        <el-option v-for="domain in domainList" :key="domain.id + 'select-domain'" :label="domain.Host" :value="domain.id"></el-option>
      </el-select>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDomain.dialog = false">取消</el-button>
          <el-button type="primary" :loading="editDomain.loading" @click="onCommitDomain">确认</el-button>
        </span>
      </template>
    </el-dialog>

    <!-- 添加专页 -->
    <add-page v-model="addPageDialog" :author="authorInfor" @childClosePage="onChildClosePage" @childRefresh="list"></add-page>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { platformId, platformName } from '@/utils/authPlatform'
import { dateFormat } from '@/utils/formatTime'
import { useStore } from '@/store/index'
import { useRouter } from 'vue-router'
import { getLocal, getUserRole } from '@/utils/storage'
import Service from './api/index'
import pageNation from '@/components/pagination/index.vue'
import addPage from './component/bindPage.vue'
import tip from '@/utils/Tip'
const store = useStore()
const router = useRouter()
const props = {
  expandTrigger: 'hover'
}
onMounted(() => {
  list()
  onCateList()
  onDomainList()
})

const total = ref(0)
// 分页
function onSizeChange(v) {
  param.ps = v
  list()
}
function onCurrentChange(v) {
  param.pi = v
  list()
}
// 查看文章
function toArticleList({Name}){
  router.push({
    name: 'Aricle',
    query:{ Name }
  })
}
// 编辑列表分类
const editTag = ref([])
const editListCate = reactive({
  loading: false,
  dialog: false,
  authorId: 0,
  cateId: 0
})
// 弹窗
const doEditAuthorCate = ({ id, Cateid }) => {
  editListCate.dialog = true
  editListCate.authorId = id
  editListCate.cateId = Cateid
}
// 编辑域名
const editDomain = ref({
  loading: false,
  dialog: false,
  id: 0,
  Domainid: 0
})
function doEditAuthorDomain({id, Domainid}){
  editDomain.value = {
    loading: false,
    dialog: true,
    id,
    Domainid
  }
}
// 确认修改域名
async function onCommitDomain(){
  const { id, Domainid } = editDomain.value
  const param = {
    authorId: id,
    domainId: Domainid
  }
  editDomain.value.loading = true
  try{
    const { Message } = await Service.apiEditDomain(param)
    list()
    tip.successMsg(Message)
    editDomain.value.dialog = false

  }catch(err){}
  editDomain.value.loading = false
}
// 确认修改
const onCommitEdit = async () => {
  const param = {
    authorId: editListCate.authorId,
    cateId: editListCate.cateId
  }
  editListCate.loading = true
  try{
    const { Message } = await Service.apiEditCate(param)
    list()
    tip.successMsg(Message)
    editListCate.dialog = false
  }catch(err){}
  editListCate.loading = false
}
const param = reactive({
  pi: 1,
  ps: 20,
  platform: '',
  state: '',  //博主状态 0关闭，1开启
  name: '', // 博主名称
  cateid: '', // 分类id
  ispaged: '', // 是否绑定专业 0 否 1 是
})

const auth = reactive({
  list: [],
  total: 0
})
const loading = ref(false)
const nouseCount = ref(0)
const useCount = ref(0)
async function list() {
  loading.value = true
  try{
    const { Data, total } = await Service.apiListAuthor(param)
    auth.list = Data
    auth.total = total
  }catch(err){}
  loading.value = false
}
// 修改状态
async function onChangeState({ id, State }) {
  try{
    const { Message } = await Service.apiChangeStateAuthor({id, state: State})
    tip.successMsg(Message)
  }catch(err){}
}
// 分类
const cateList = ref([])
async function onCateList(){
  try{
    const { Data } = await Service.apiCateList({pi: 1, ps: 999})
    cateList.value = Data
  }catch(err){}
}
// 域名
const domainList = ref([])
async function onDomainList(){
  try{
    const { Data } = await Service.apiDomainList({pi: 1, ps: 999})
    domainList.value = Data
  }catch(err){}
}
const platform = (p) => platformName(p)
// 新增专页
const addPageDialog = ref(false)
const authorInfor = reactive({
  Pageid: 0,
  authorId: 0
})
function onAddPage(row) {
  addPageDialog.value = true
  authorInfor.Pageid = row.Pageid
  authorInfor.authorId = row.id
}
function onChildClosePage() {
  addPageDialog.value = false
}
const tagGroupId = ref([])
// 新增博主
const author = reactive({
  dialog: false,
  url_str: '',
})

const ruleFormRef = ref(null)
const cateFormRef = ref(null)
const validateUrl_str = (rule: any, value: any, callback: any) => {
  const r = value !== '' || value.includes('https://') || value.includes('http://') ? true : false
  if (!r) {
    callback(new Error(''))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  url_str: [{ required: true, validator: validateUrl_str, trigger: 'blur' }],
  cateid: [{ required: true, message: '', trigger: 'blur' }],
  domainid: [{ required: true, message: '', trigger: 'blur' }],
})
const handleClose = () => {
  author.url_str = ''
  ruleFormRef.value.resetFields()
  author.dialog = false
  addAuthorInfor.value = {
    uid: '',
    name: '',
    pic: '',
    cateid: '',
    platform: '',
    domainid: ''
  }
}
const addLoading = ref(false)
// 确认新增博主
async function onCommit() {
  cateFormRef.value.validate((valid) => {
    console.log(valid);
    if (valid) {
      apiAddAuth()
    }
  })
}
const addAuthorLoading = ref(false)
async function apiAddAuth() {
  addAuthorLoading.value = true
  try{
    const { Message } = await Service.apiAddAuthor(addAuthorInfor.value)
    tip.successMsg(Message)
    handleClose()
    list()
  }catch(err){}
  addAuthorLoading.value = false
}
// 博主信息
const addAuthorInfor = ref({
  uid: '',
  name: '',
  pic: '',
  cateid: '',
  platform: '',
  domainid: '',
  token: '',
  url: ''
})
async function onCommitCollection() {
  ruleFormRef.value.validate((valid) => {
    if (valid) {
      apiCommitCollection()
    }
  })
}
async function apiCommitCollection() {
  addLoading.value = true
  const param = { url: author.url_str }
  try{
    const { Data } = await Service.apiCollectionAuthor(param)
    addAuthorInfor.value = {
      uid: Data.uid,
      name: Data.name,
      pic: Data.avatar,
      platform: Data.platform,
      domainid: '',
      url: author.url_str,
      token: Data.token,
      cateid: '',
    }
  }catch(err){}
  addLoading.value = false
}
</script>
<style scoped>
.el-select{width: 100%;}
</style>
