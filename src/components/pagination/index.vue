<template>
  <div style="padding: 15px 0">
      <el-pagination
        :current-page="currentPage"
        :page-size="pageSize"
        :page-sizes="[10, 20, 40, 100, 500]"
        :background="true"
        layout="total, sizes, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
    total:{
        type: Number,
        default: 0
    },
    pageSize:{
        type:Number,
        default: 20
    },
    currentPage:{
        type: Number,
        default: 1
    }
})
const emits = defineEmits(['childSizeChange', 'childCurrentChange'])
const handleSizeChange = (v) => {
    emits('childSizeChange', v)
}
const handleCurrentChange = (v) => {
    emits('childCurrentChange', v)
}
</script>

<style>

</style>
