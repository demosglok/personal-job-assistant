<template>
  <div class="wrapper">
    <el-row>
      <el-col :span="8">{{name}}:</el-col>
      <el-col :span="16">
        <el-input :modelValue="value" type="textarea" autosize @input="$emit('update:value', $event)"/>
      </el-col>
    </el-row>

  </div>
</template>
<script>

export default {
  name: 'CriteriaText',
  props: {
      name: String,
      value: String
  },
  emits: ['update:value']
}
</script>
<style scoped>
.wrapper {
  width: 100%;
}

</style>
