<template>
<div>
  <Navigation/>
  <div class="container">
    <div v-if="loadingStatus" class="text-center">
      <Loader/>
    </div>
    <div class="container" v-else>

      <div class="row" style="margin-bottom:5%">
          <div class="col-6" style="text-align:left">
              <h1 style="font-size:30px">Администрирование ЛПП</h1>
          </div>
          <div class="col-6" style="text-align:right">
              <b-button variant="success" :to="{name:'createLpp'}">Редактировать ЛПП</b-button> 
          </div>
      </div>
      <a href="/lpp/login">Ссылка на проведение конкурса</a>
      <div class="row">
        <div class="col-6">
          <p></p>
        </div>
        <div v-for="el in [1,2,3]" class="col-2" :key="el">
          <h6 style="font-size:8px; font-weight:700">Раунд <span>{{el}}</span></h6>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <p></p>
        </div>
        <div v-for="el,ind in ['round_1_finished', 'round_2_finished', 'round_3_finished']" class="col-2" :key="el">
          <AdminLppButton :round_finished="el" :numRound="ind+1" />
        </div>
      </div>
      <hr style="margin-bottom:5%">
      <div v-for="item of judgesList" :key="item.id">
        <AdminLppColumn :judge="item" />
      </div>
    </div>
    <hr>
    <div id="link" style="text-align:center; margin-top:5%; font-size:20px;"> 
      <Router-link tag="p" :to="{ name: 'LppResults'}">Посмотреть результаты голосования</Router-link>
    </div>
  </div>
</div>
</template>

<script>
import AdminLppColumn from '@/components/lpp/AdminLppColumn.vue'
import AdminLppButton from '@/components/lpp/AdminLppButton.vue'
import Loader from '@/components/Loader'
import { mapState } from 'vuex'
import Navigation  from '@/components/Navigation.vue'

export default {
  components: {
    AdminLppColumn,
    Loader,
    AdminLppButton,
    Navigation,
  },
  data() {
    return {
      loadingStatus:true,
    }
  },
  computed: mapState ({
    judgesList: state => state.lpp.judgesList,
  }),

  async mounted() {
    this.loadingStatus=true
    await this.$store.dispatch('createLpp/roundList')
    await this.$store.dispatch('lpp/judgesList')
    this.loadingStatus=false
    setInterval(async () =>  {
        await this.$store.dispatch('lpp/judgesList')}
    ,4 * 1000)
  },
  methods: {

  },
}
</script>

<style scoped>
#link{
  color:green;
}
#link:hover{
  color:blue;
  cursor:pointer;
}
</style>