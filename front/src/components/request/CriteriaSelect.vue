<template>
  <div class="wrapper">

    <el-row>
      <el-col :span="8">{{name}}:</el-col>
      <el-col :span="16">
        <el-select :modelValue="value" @change="$emit('update:value', $event)">
          <el-option
            v-for="item in options"
            :key="item.key"
            :label="item.label"
            :value="item.key">
          </el-option>
        </el-select>
      </el-col>
    </el-row>
  </div>
</template>

<script>

export default {
  name: 'CriteriaSelect',
  props: {
      name: String,
      options: Array,
      value: String
  },
  emits: ['update:value'],
}
</script>
<style scoped>
.wrapper {
  width: 100%;
}

</style>
