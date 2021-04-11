<template>
  <div class="wrapper">
    <h3>Текстовое поле и ключевые слова</h3>
    <el-row><el-col :span="8">Название:</el-col><el-col :span="16"><el-input v-model="name" @change="onChange"/></el-col></el-row>
    <div> Ключевые слова с весами:</div>
    <div v-for="(keyword, index) in keywords" :key="keyword.key">
      <el-row :gutter="20">
        <el-col :span="10">
          <el-input v-model="keyword.word"/>
        </el-col>
        <el-col :span="10">
          <el-input v-model="keyword.weight" @change="onChange"/>
        </el-col>
        <el-col :offset="2" :span="2">
          <el-button @click="deleteKeyword(index)" icon="el-icon-delete" circle size="small" />
        </el-col>
      </el-row>
    </div>
    <el-button size="small" @click="addKeyword">Добавить ключевое слово</el-button>
  </div>
</template>
<script>
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'CriteriaText',
  props: {
      data: Object,
      /*{
        name: String,
        keywords: [{word: String, weight: Number}],// for 'text' type
      }*/
  },
  data() {
    return {
      name: '',
      keywords: []
    }
  },
  mounted() {
    this.name = this.data.name;
    this.keywords = this.data.keywords
      ? this.data.keywords.map(({word, weight, key}) => ({word, weight, key: key ?? uuidv4()}))
      : [];
  },
  methods: {
    deleteKeyword(index) {
      this.keywords.splice(index, 1);
      this.$emit('dataupdated', {name: this.name, keywords: [...this.keywords]});
    },
    addKeyword() {
      this.keywords.push({word: 'слово', weight: 1});
      this.$emit('dataupdated', {name: this.name, keywords: [...this.keywords]});
    },
    onChange() {
      this.$emit('dataupdated', {name: this.name, keywords: [...this.keywords]});
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
