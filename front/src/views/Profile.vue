<template>
  <div class="wrapper">
    <h1>Ваш Профиль</h1>
    <p>
      Если вы еще не заполняли, здесь нужно создать небольшую форму,
      в которой предложить наиболее важные для вас критерии в поиске работы: зарплата, стек, компания, район
    </p>
    <p v-if="no_existing_profile">6 вопросов сгенерированы по шаблону. Вы можете удалить их и создать свои или отредактировать</p>
    <div class="criterias">
      <div v-for="(criteria, index) in criterias" :key="criteria.name" class="criteria">

        <CriteriaText :data="criteria" v-if="criteria.type=='text'" @dataupdated="onCriteriaDataUpdated(index, $event)"/>
        <CriteriaNumber :data="criteria" v-if="criteria.type=='number'" @dataupdated="onCriteriaDataUpdated(index, $event)"/>
        <CriteriaSelect :data="criteria" v-if="criteria.type=='select'" @dataupdated="onCriteriaDataUpdated(index, $event)"/>
        <div class="delbtn_wrapper"><el-button @click="deleteCriteria(index)" type="danger" icon="el-icon-delete" circle /></div>
      </div>
    </div>
    <div class="controls">
      <div>
      <el-button @click="addText" type="primary">Добавить текстовое поле</el-button>
      <el-button @click="addSelect" type="primary">Добавить поле с вариантами</el-button>
      <el-button @click="addNumber" type="primary">Добавить числовое поле</el-button>
      </div>
      <div>
      <el-button @click="save" type="success">Сохранить форму</el-button>
      </div>
    </div>
  </div>
</template>

<script>
const criteria_types = Object.freeze({text: 'text', number: 'number', select: 'select'});

import CriteriaText from '@/components/CriteriaText';
import CriteriaNumber from '@/components/CriteriaNumber';
import CriteriaSelect from '@/components/CriteriaSelect';
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'Profile',
  data() {
    return {
      criterias: [{
        key: uuidv4(),
        name: 'Зарплата',
        type: criteria_types.number,
        start_weight: 10,
        min_acceptable_value: 4500,
        weight_per_increment: 0.02, // 20 for each $1000
      },
      {
        key: uuidv4(),
        name: 'Языки программирования (стек)',
        type: criteria_types.text,
        keywords: [{word: 'C++', weight: 10}, {word: 'C#', weight: 20}, {word: 'javascript', weight: -10}],
      },
      {
        key: uuidv4(),
        name: 'Аутсорс/Продукт',
        type: criteria_types.select,
        select_options: [{option: 'аутсорс', weight: 5}, {option: 'аутстаф', weight: 10}, {option: 'продукт', weight: 10}, {option: 'стартап', weight: 20}],
      },
      {
        key: uuidv4(),
        name: 'Индустрия/Сфера',
        type: criteria_types.select,
        select_options: [{option: 'Healthcare', weight: 5}, {option: 'Gaming', weight: 5}, {option: 'ФинТех', weight: 10}, {option: 'Остальное', weight: 0}],
      },
      {
        key: uuidv4(),
        name: 'Удаленная работа',
        type: criteria_types.select,
        select_options: [{option: 'полностью удаленно', weight: 20}, {option: 'полностью офис', weight: -10}, {option: 'гибрид офис+удаленка', weight: 10}],
      },
      {
        key: uuidv4(),
        name: 'Город',
        type: criteria_types.text,
        keywords: [{word: 'Киев', weight: 10}, {word: 'Днепр', weight: 20}, {word: 'Удаленно', weight: 30}],
      }]
    }
  },
  computed: {
    no_existing_profile() {
      return true;
    }
  },
  methods: {
    addText() {
      this.criterias.push({key: uuidv4(), name: `Критерий ${this.criterias.length}`, type: criteria_types.text});
    },
    addSelect() {
      this.criterias.push({key: uuidv4(), name: `Критерий ${this.criterias.length}`, type: criteria_types.select});
    },
    addNumber() {
      this.criterias.push({key: uuidv4(), name: `Критерий ${this.criterias.length}`, type: criteria_types.number});
    },
    deleteCriteria(index) {
      this.criterias.splice(index, 1);
    },
    save() {
      console.log('save', [...this.criterias]);
    },
    onCriteriaDataUpdated(index, changedData) {
      console.log('changed', this.criterias[index], {...changedData});
      // preserving key
      const newObject = {...changedData};
      newObject.key = this.criterias[index].key;
      newObject.type = this.criterias[index].type;
      this.criterias.splice(index, 1, newObject)
    },

  },
  components: {
    CriteriaSelect,
    CriteriaText,
    CriteriaNumber
  }
}
</script>


<style scoped>
.criterias {
  padding: 16px;
  background: aliceblue;
}
.criteria {
  margin: 12px 12px 24px 12px;
  padding: 12px;
  border: 1px solid navy;
  display: flex;
  justify-content: space-between;
}
.controls {
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
}
.delbtn_wrapper {
  margin-left: 20px;
}
</style>
