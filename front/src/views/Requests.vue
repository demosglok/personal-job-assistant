<template>
  <div class="wrapper">
    <div v-if="error" class="error">{{error}}</div>
    <h1>Список запросов</h1>
      <div class="timeperiod">
        <el-radio-group v-model="timeperiod">
          <el-radio-button :label="timeperiods.DAY"></el-radio-button>
          <el-radio-button :label="timeperiods.WEEK"></el-radio-button>
          <el-radio-button :label="timeperiods.MONTH"></el-radio-button>
        </el-radio-group>
      </div>
    <h3>Топ 5 предложений за выбранный период</h3>
    <div class="vacancies">
      <div class="header_fields">
        <div class="weight_header">Weight</div>
        <div v-for="header in headers" :key="header">{{header}}</div>
      </div>
      <div v-for="vacancy in vacancies" :key="vacancy.key" class="vacancy">
         <div class="vacancy_answers">
          <div class="vacancy_weight">{{vacancy.weight}}</div>
          <div v-for="answer in vacancy.answers" :key="answer">{{answer}}</div>
         </div>
         <el-row class="recruiter_fields">
          <el-col :span="16">{{vacancy.raw_text}}</el-col>
          <el-col :span="4">{{vacancy.recruiter_name}}</el-col>
          <el-col :span="4">{{vacancy.contact}}</el-col>
         </el-row>
      </div>
    </div>

  </div>
</template>

<script>
import timeconstants from '@/constants/timeconstants';

export default {
  name: 'Requests',
  data() {
    return {
      error: null,
      timeperiod: timeconstants.DAY,
      dayVacancies: [],
      weekVacancies: [],
      monthVacancies: [],
    }
  },
  computed: {
    criterias() {
      return this.$store.state.profile?.criterias || [];
    },
    vacancies() {
      let vacancies = [];
      switch(this.timeperiod) {
        case timeconstants.DAY:
          vacancies = this.dayVacancies;
          break;
        case timeconstants.WEEK:
          vacancies = this.weekVacancies;
          break;
        case timeconstants.MONTH:
          vacancies = this.monthVacancies;
          break;
      }
      vacancies = vacancies.map(({calculated_weight, answers}) => ({
        weight: calculated_weight,
        answers: answers.map(({answer}, index) =>
          this.criterias[index].type == 'select'
          ? this.criterias[index].select_options.find(({key}) => key == answer)?.option
          : answer
        )
      }));
      return vacancies;
    },
    timeperiods() {
      return timeconstants;
    },
    headers() {
      return this.criterias.map(({name}) => name);
    }
  },
  mounted() {
    this.loadDayVacancies();
  },
  methods: {
    loadDayVacancies() {
      this.$store.dispatch('loadRequests', timeconstants.DAY)
        .then(res => this.dayVacancies = res.requests)
        .catch(() => this.error = 'Ошибка при загрузке, попробуйте обновить страницу');
    },
    loadWeekVacancies() {
      this.$store.dispatch('loadRequests', timeconstants.WEEK)
        .then(res => this.weekVacancies = res.requests)
        .catch(() => this.error = 'Ошибка при загрузке, попробуйте обновить страницу');
    },
    loadMonthVacancies() {
      this.$store.dispatch('loadRequests', timeconstants.MONTH)
        .then(res => this.monthVacancies = res.requests)
        .catch(() => this.error = 'Ошибка при загрузке, попробуйте обновить страницу');
    }
  },
  watch: {
    timeperiod(newVal) {
      if(newVal == timeconstants.DAY) {
        this.loadDayVacancies();
      } else if(newVal == timeconstants.WEEK) {
        this.loadWeekVacancies();
      } else if(newVal == timeconstants.MONTH) {
        this.loadMonthVacancies();
      }
    }
  }
}
</script>


<style scoped>
.header_fields {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-bottom: 16px;
  display: flex;
}
.header_fields > div {
  padding: 8px;
  width: 100%;
}
.vacancy {
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
.vacancy_answers {
  display: flex;
}

.vacancy_answers > div {
  padding: 8px;
  width: 100%;
}
.vacancy_weight {
  width: 60px;
  background: #cfe;
  font-size: 16px;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
}
.recruiter_fields {
  margin-top: 12px;
  background: #ececec;
  padding: 12px;
}
</style>
