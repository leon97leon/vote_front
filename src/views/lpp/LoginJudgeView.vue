<template>
<div>
  <div class="authorization">
    <div class="authorization__container">
        <h4 class="authorization__title">Авторизация</h4>
      <form @submit.prevent>
        <div class="authorization__wrapper">
          <label for="userEmail">Выберите пользователя</label>
          <select id="userEmail" @change="updateSelectedUser($event.target)">
            <option disabled selected value></option>
            <option
              v-for="item in judgesList"
              :key="item.id"
              :value="item.email"
              >
              {{item.name}}
            </option>
          </select>
        </div>
        <input class="authorization__input"
          type="number"
          placeholder="Код подтверждения"
          v-model="validationCode"
        >
      </form>
      <button @click="login" class="authorization__submit" :disabled="loadingStatus">
        <div v-if="!loadingStatus">
          Войти
        </div>
        <div v-else class="spinner-border" role="status">
          <span class="sr-only"></span>
        </div>
      </button>
    </div>
  </div>
</div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: "Login",  
  components: {

  },
  computed:mapState({
      judgesList: state => state.lpp.judgesList,
  }),
  data() {
    return {
      validationCode: null,
      email: '',
      loadingStatus:true,
    }
  },
  beforeCreate() {
    document.body.className = 'body--private';
  },
  async mounted() {
    await this.$store.dispatch('lpp/judgesList')
    this.loadingStatus=false
  },
  methods: {
    async login(){
      this.loadingStatus=true
      await this.$store.dispatch('lpp/loginJudge',{email:this.email,validationCode:+this.validationCode})
      .then(response => {
        this.$store.commit('lpp/clearJudgeSettings')
        this.$store.commit('lpp/loginJudge',response.data.judge)
        this.$router.push('game')
      })
      .catch(error=>{
        this.$store.commit('lpp/errorLoginHandler',error.response.status)
      })
      this.loadingStatus=false
    },
    updateSelectedUser(event){
        this.email = event.value
    }
  },
}
</script>

<style lang="scss">

</style>