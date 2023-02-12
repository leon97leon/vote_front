<template>
    <div>
        <Navigation></Navigation>
        <div class="container">

            <div class="row justify-content-md-between justify-content-end">
                <h1 class="col-md-6 col-sm-6">Сервис оценки СВА</h1>
                <router-link class="col-md-2 col-6" tag="a" :to="{name:'adminQuiz'}">
                    <h5 class="text-end">Личный кабинет</h5>
                </router-link>

            </div>
            <div class="row mt-3 justify-content-between mb-3" style="margin:0 auto 0 auto ">
                <div  class="col-md-2 col-sm-12 " style="padding:0 auto">
                    <input type="radio" class="btn-check" name="options" id="c1" value="1" v-model="numTab"
                        autocomplete="off">
                    <label :class="{btnPassive: true, btnSelected: numTab===1}" for="с1"
                        @click="numTab=1">Сводка</label>


                </div>
                <div class="col-md-2 col-sm-12">
                    <input type="radio" class="btn-check" name="options" id="c2" value="2" v-model="numTab"
                        autocomplete="off">
                    <label :class="{btnPassive: true, btnSelected: numTab===2}" for="с2"
                        @click="numTab=2">Вопрос</label>

                </div>
                <div class="col-md-3 col-sm-12">
                    <input type="radio" class="btn-check" name="options" id="c3" value="3" v-model="numTab"
                        autocomplete="off">
                    <label :class="{btnPassive: true, btnSelected: numTab===3}" for="с3" @click="numTab=3">Журнал
                        ответов участников</label>

                </div>
                <div class="col-md-2 col-sm-12">
                    <input type="radio" class="btn-check" name="options" id="c4" value="4" v-model="numTab"
                        autocomplete="off">
                    <label :class="{btnPassive: true, btnSelected: numTab===4}" for="с4" @click="numTab=4">Рейтинг
                        участников</label>

                </div>
                <div class="col-md-3 col-sm-12" style="padding:0 auto">
                    <input type="radio" class="btn-check" name="options" id="c5" value="5" v-model="numTab"
                        autocomplete="off">
                    <label :class="{btnPassive: true, btnSelected: numTab===5}" for="с5" @click="numTab=5">Журнал
                        регистрации участников</label>

                </div>
            </div>


            <div class="row justify-content-end " style="height:40px">
                <b-button v-if="numTab!==5" class="col-lg-2 col-md-4 col-sm-4 m-md-3  btn-warning" @click="excel()">Выгрузка в Excel</b-button>
                <!-- :href="linkExelResults+this.id+'/' -->
            </div>
            <keep-alive>
                <TabSummary v-if="numTab==1" :id="this.id"></TabSummary>
                <TabReportQuestion v-if="numTab==2" :id="this.id"></TabReportQuestion>
                <TabAnswerLog v-if="numTab==3" :id="this.id"></TabAnswerLog>
                <TabRating v-if="numTab==4" :id="this.id"></TabRating>
                <TabRegistrationLog v-if="numTab==5" :id="this.id"></TabRegistrationLog>


            </keep-alive>

        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import config from '@/scripts/api-config'

const API_URL = config['API_LOCATION'] + 'api/quiz/'
import Navigation from '@/components/Navigation.vue';
import TabSummary from './ReportMenuTab/TabSummary.vue';
import TabReportQuestion from './ReportMenuTab/TabReportQuestion.vue';
import TabAnswerLog from './ReportMenuTab/TabAnswerLog.vue';
import TabRating from './ReportMenuTab/TabRating.vue';
import TabRegistrationLog from './ReportMenuTab/TabRegistrationLog.vue';
import axios from 'axios';

export default {
    data() {
        return {
            numTab: 1,
            linkExelResults:'#'
        }
    },
    props:['id'],
    computed:{
     
        numTab:{
            get(){
                console.log(this.$store.getters['lpp/numTab'])
                return this.$store.getters['lpp/numTab']
            },
            set(numTab){
                this.$store.commit('lpp/numTab',numTab)
            }
        }
    },
    computed: mapState ({
        token: state => state.quiz.accessToken,

    }),
    mounted(){
        this.linkExelResults=API_URL+'svod/excel-load/'
    },
    methods: 
    {
        excel(){
            axios({
          url:  this.linkExelResults + this.id+'/',
          type: 'GET',
          headers: {
                    "Authorization": 'Token ' + this.token
                 },
          async: false,
          responseType: 'blob', // important
                }).then((response) => {
                    if (response.data.type !== 'application/json')
                    {
                        const url = window.URL.createObjectURL(new Blob([response.data]));
                        const link = document.createElement('a');
                        link.href = url;
                        link.setAttribute('download', 'svod.xlsx');
                        document.body.appendChild(link);
                        link.click();
                    }
                }).catch(err=>{alert('Сводка пустая!')});
        }
    
    },    
    components: { Navigation, TabSummary, TabReportQuestion, TabAnswerLog, TabRating, TabRegistrationLog }
}



</script>
<style>
.btnPassive {
    border-radius: 0;
    background: #e6e6e6;
    border: none;
    color: black;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
}

.btnSelected {
    background: green;
    color: white;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
}

.btnPassive:hover,
.btnSelected:hover {
    cursor: pointer;
}
</style>