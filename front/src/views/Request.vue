<template>
  <div class="wrapper">
    <div v-if="error" class="error">{{error}}</div>
    <template v-if="!saved">
    <h1>Предложите мне вакансию</h1>
    <p>Добрый день</p>
    <p>Меня зовут {{name}}</p>
    <p>Если вы попали сюда, то скорей всего Вы перешли по ссылке в одном из моих профилей</p>
    <p>К сожалению мне пишут очень много предложений и я физически не успеваю всем отвечать.
    Здесь выделены важные для меня критерии в предлагаемых вакансиях и эта простая страничка, на которую Вы перешли, поможет мне
    отсортировать все предложения по "интересности". Таким образом я увижу в первую очередь наиболее перспективыне предложения и смогу им ответить
    не утонув в море менее релевантных вариантов.</p>
    <p>Если Вас не затруднит - заполните пожалуйста пункты о предлагаемой вакансии ниже</p>
    <div class="criterias">
      <div v-for="(criteria, index) in criterias" :key="criteria.key" class="item">
        <CriteriaText :name="criteria.name" v-if="criteria.type=='text'" v-model:value="answers[index]"/>
        <CriteriaNumber :name="criteria.name" v-if="criteria.type=='number'" v-model:value="answers[index]"/>
        <CriteriaSelect :name="criteria.name" :options="criteria.select_options" v-if="criteria.type=='select'" v-model:value="answers[index]"/>

      </div>

      <el-row class="item">
        <el-col :span="8">Описание вакансии в свободной форме</el-col>
        <el-col :span="16"><el-input v-model="raw_description" type="textarea" autosize/></el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="8">Ваше имя</el-col>
        <el-col :span="16"><el-input v-model="recruiter_name" /></el-col>
      </el-row>
      <el-row class="item">
        <el-col :span="8">Ваш контакт</el-col>
        <el-col :span="16"><el-input v-model="contact" /></el-col>
      </el-row>
      <div class="item">
        <el-button @click="send" type="success">Отправить</el-button>
      </div>
    </div>
    </template>
    <template v-else>
      <h1>Спасибо что воспользовались этим сервисом</h1>
      <p>Ваше предложение сохранено. Если оно попадет в топ интересных мне предложений, я обязательно отвечу</p>
    </template>
  </div>
</template>

<script>
import CriteriaText from '@/components/request/CriteriaText';
import CriteriaNumber from '@/components/request/CriteriaNumber';
import CriteriaSelect from '@/components/request/CriteriaSelect';

export default {
  name: 'Request',
  data() {
    return {
      error: null,
      name: null,
      criterias: [],
      answers: [],
      raw_description: null,
      recruiter_name: null,
      contact: null,
      saved: false
    }
  },
  mounted() {
    this.$store.dispatch('loadProfileForRequest', this.$route.params.id)
      .then(profile => {
        this.criterias = [...profile.criterias];
        this.answers = profile.criterias.map(criteria => criteria.type == 'number' ? 0 : '');
        this.name = profile.name_for_profile;
      })
      .catch(() => {
        this.error = 'Ошибка при загрузке профиля, возможно неверный адрес'
      });
  },
  methods: {
    send() {
      const request = {
        answers: this.answers.map((answer, index) => ({answer: answer, criteria_key: this.criterias[index].key})),
        raw_description: this.raw_description,
        recruiter_name: this.recruiter_name,
        contact: this.contact
      };
      console.log('storing', this.$route.params.id);
      this.$store.dispatch('storeRequest', {request, hash: this.$route.params.id})
        .then(() => this.saved = true)
        .catch(() => this.error = 'Ошибка при сохранениии. Попробуйте еще раз');
    }
  },
  components: {
    CriteriaSelect,
    CriteriaText,
    CriteriaNumber
  }
}
</script>


<style scoped>
.error {
  padding: 4px;
  border: 1px solid red;
  background: #fcc;
}
.criterias {
  padding: 16px;
  background: aliceblue;
}
.item {
  margin-bottom: 12px;
}
</style>
