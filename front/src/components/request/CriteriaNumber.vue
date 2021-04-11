<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="8">{{name}}:</el-col>
      <el-col :span="16"><el-input-number :modelValue="value" @input="$emit('update:value', $event)"/></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'CriteriaNumber',
  props: {
      name: String,
      value: Number
  },
  emits: ['update:value'],
}
</script>
<style scoped>
.wrapper {
  width: 100%;
}
</style>
