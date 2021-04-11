<template>
  <div class="wrapper">
    <h3>Выбор с вариантами</h3>
    <el-row><el-col :span="8">Название:</el-col><el-col :span="16"><el-input v-model="name" @change="onChange"/></el-col></el-row>
    <div> Варианты значений с весами:</div>
    <div v-for="(option, index) in select_options" :key="option.key">
      <el-row :gutter="20">
        <el-col :span="10">
          Значение <el-input v-model="option.option" @change="onChange"/>
        </el-col>
        <el-col :span="10">
          Вес для этого значения <el-input v-model="option.weight" @change="onChange"/>
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button @click="deleteSelectOption(index)" icon="el-icon-delete" circle size="small" />
        </el-col>
      </el-row>
    </div>
    <el-button size="small" @click="addSelectOption">Добавить вариант</el-button>
  </div>
</template>

<script>

import {v4 as uuidv4} from 'uuid';

export default {
  name: 'CriteriaSelect',
  props: {
      data: Object
  },
  data() {
    return {
      name: '',
      select_options: []
    }
  },
  mounted() {
    this.name = this.data.name;
    this.select_options = this.data.select_options
      ? this.data.select_options.map(({option, weight, key})=>({option, weight, key: key ?? uuidv4()}))
      : [];
  },
  methods: {
    deleteSelectOption(index) {
      this.select_options.splice(index, 1);
      this.$emit('dataupdated', {name: this.name, select_options: [...this.select_options]});
    },
    addSelectOption() {
      this.select_options.push({option: 'вариант', weight: 1});
      this.$emit('dataupdated', {name: this.name, select_options: [...this.select_options]});
    },
    onChange() {
      this.$emit('dataupdated', {name: this.name, select_options: [...this.select_options]});
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
