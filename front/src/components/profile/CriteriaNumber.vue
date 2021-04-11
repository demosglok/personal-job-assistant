<template>
  <div class="wrapper">
    <h3>Численное значение (ЗП, дни отпуска)</h3>
    <el-row>
      <el-col :span="8">Название:</el-col>
      <el-col :span="16"><el-input v-model="name" @change="onChange"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Минимальное допустимое значение:</el-col>
      <el-col :span="16"><el-input v-model="min_acceptable_value" @change="onChange"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Начальный вес для этого параметра:</el-col>
      <el-col :span="16"><el-input v-model="start_weight" @change="onChange"/></el-col>
    </el-row>
    <el-row>
      <el-col :span="8">Изменение веса на каждый +1 величины:</el-col>
      <el-col :span="16"><el-input v-model="weight_per_increment" @change="onChange"/></el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: 'CriteriaNumber',
  props: {
      data: Object
  },
  data() {
    return {
      name: '',
      min_acceptable_value: 0,
      start_weight: 0,
      weight_per_increment: 0
    }
  },
  mounted() {
    this.name = this.data.name;
    this.min_acceptable_value = this.data.min_acceptable_value;
    this.start_weight = this.data.start_weight;
    this.weight_per_increment = this.data.weight_per_increment;
  },
  methods: {
    onChange() {
      this.$emit('dataupdated', {
        name: this.name,
        min_acceptable_value: this.min_acceptable_value,
        start_weight: this.start_weight,
        weight_per_increment: this.weight_per_increment
      });
    }
  }
}
</script>
<style scoped>
.wrapper {
  width: 100%;
}
.el-row {
  margin-bottom: 12px;
}
</style>
