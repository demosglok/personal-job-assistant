<template>
  <div class="wrapper">
    <h1>Ваш Профиль</h1>
    <template v-if="no_existing_profile">
    <p>
      Если вы еще не заполняли, здесь нужно создать небольшую форму,
      в которой предложить наиболее важные для вас критерии в поиске работы: зарплата, стек, компания, район
    </p>
    <p>6 вопросов сгенерированы по шаблону. Вы можете удалить их и создать свои или отредактировать</p>
    </template>
    <template v-else>
    <p>Это ваш список наиболее важных критериев (например зарплата, стек, удаленка) с их весами для сортировки вакансий по
    интересности лично для Вас</p>
    <p>
      Ссылка на профиль для рекрутеров <a :href="profile_url" target="_blank">{{profile_url}}</a>
    </p>
    <p>Разместите ее в Ваших профилях с вежливым комментарием что б предложить рекрутерам писать Вам через эту форму если
    Вы не отвечаете на их запросы. Например <span class="example">"Приношу свои извинения если не отвечаю на ваши сообщения.
    Воспользутесь следующей ссылкой для ваших предложений, так больше шанс что отвечу {{profile_url}}"</span></p>
    </template>
    <div class="criterias">
      <div>
        <el-row>
          <el-col :span="8">Ваше имя как его увидит рекрутер</el-col>
          <el-col :span="16"><el-input v-model="name_for_profile"/></el-col>
        </el-row>
      </div>
      <div v-for="(criteria, index) in criterias" :key="criteria.key" class="criteria">

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

import CriteriaText from '@/components/profile/CriteriaText';
import CriteriaNumber from '@/components/profile/CriteriaNumber';
import CriteriaSelect from '@/components/profile/CriteriaSelect';
import {v4 as uuidv4} from 'uuid';

export default {
  name: 'Profile',
  data() {
    return {
      name_for_profile: null,
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
        keywords: [{word: 'C++', weight: 10, key: uuidv4()}, {word: 'C#', weight: 20, key: uuidv4()}, {word: 'javascript', weight: -10, key: uuidv4()}],
      },
      {
        key: uuidv4(),
        name: 'Аутсорс/Продукт',
        type: criteria_types.select,
        select_options: [{option: 'аутсорс', weight: 5, key: uuidv4()}, {option: 'аутстаф', weight: 10, key: uuidv4()}, {option: 'продукт', weight: 10, key: uuidv4()}, {option: 'стартап', weight: 20, key: uuidv4()}],
      },
      {
        key: uuidv4(),
        name: 'Индустрия/Сфера',
        type: criteria_types.select,
        select_options: [{option: 'Healthcare', weight: 5, key: uuidv4()}, {option: 'Gaming', weight: 5, key: uuidv4()}, {option: 'ФинТех', weight: 10, key: uuidv4()}, {option: 'Остальное', weight: 0, key: uuidv4()}],
      },
      {
        key: uuidv4(),
        name: 'Удаленная работа',
        type: criteria_types.select,
        select_options: [{option: 'полностью удаленно', weight: 20, key: uuidv4()}, {option: 'полностью офис', weight: -10, key: uuidv4()}, {option: 'гибрид офис+удаленка', weight: 10, key: uuidv4()}],
      },
      {
        key: uuidv4(),
        name: 'Город',
        type: criteria_types.text,
        keywords: [{word: 'Киев', weight: 10, key: uuidv4()}, {word: 'Днепр', weight: 20, key: uuidv4()}, {word: 'Удаленно', weight: 30, key: uuidv4()}],
      }]
    }
  },
  computed: {
    no_existing_profile() {
      console.log("profile doesn't exist", !this.$store.state.profile);
      return !this.$store.state.profile;
    },
    profile_url() {
      const profile_id = this.$store.state.profile.uniq_url;
      if(profile_id) {
        return `${window.location.origin}/request/${profile_id}`;
      } else {
        return null;
      }
    },
    stored_profile() {
      return this.$store.state.profile;
    }

  },
  mounted() {
    if(this.$store.state.profile) {
      console.log('using profile from backend', this.$store.state.profile);
      this.criterias = this.$store.state.profile.criterias.map(criteria => ({...criteria, key: criteria.key ?? uuidv4()}));
      this.name_for_profile = this.$store.state.profile.name_for_profile;
    } else {
      this.name_for_profile = this.$store.state.user.name;
    }
  },
  watch: {
    stored_profile(newVal) {
      this.criterias = newVal.criterias.map(criteria => ({...criteria, key: criteria.key ?? uuidv4()}));
      this.name_for_profile = newVal.name_for_profile;
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
      this.$store.dispatch('storeProfile', {criterias: [...this.criterias], name_for_profile: this.name_for_profile});
    },
    onCriteriaDataUpdated(index, changedData) {
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
.example {
  color: #555;
  font-style: italic;
}
</style>
