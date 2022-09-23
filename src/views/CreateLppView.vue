
<template>
<div>
    <Navigation/>
    <div class="container card" style="padding-top:2%">
        <h1>Редактирование ЛПП</h1>
        <div style="text-align:left" class="row">
            <div v-if="loadingStatus" class="text-center">
                <Loader/>
            </div>
            <div v-else class="col-sm-10 col-md-8 col-lg-5 col-xs-12">
                <b-button class="btn-passive" @click="showModal.SelectJudge = true">Жюри</b-button>
                <b-button class="btn-passive" @click="showModal.SelectParticipant = true">Участники</b-button>
                <b-button class="btn-passive" @click="showModal.SetRounds = true">Формирование раундов</b-button>
                <b-button class="btn-passive" @click="showModal.SetTables = true">Формирование столов</b-button>
                <b-button class="btn-passive" @click="showModal.BindJudges = true">Настройка судейства</b-button>
                <b-button class="btn-danger" @click="showModal.ClearAllResults = true">Очистить результаты участников</b-button>
            </div>
            <ModalClearAllResults v-if="showModal.ClearAllResults" @close="showModal.ClearAllResults = false"/>
            <ModalSelectJudge v-if="showModal.SelectJudge" @close="showModal.SelectJudge = false"/>
            <ModalSelectParticipant v-if="showModal.SelectParticipant" @close="showModal.SelectParticipant = false"/>
            <ModalSetRounds v-if="showModal.SetRounds" @close="showModal.SetRounds = false"/>
            <ModalSetTables v-if="showModal.SetTables" @close="showModal.SetTables = false"/>
            <ModalBindJudges v-if="showModal.BindJudges" @close="showModal.BindJudges = false"/>
        </div>
        <div style="margin-top:2%" class="row">
            <div class="col-8"></div>
            <div class="col-4">
                <b-button class="btn" @click="goToAdmin">Ok</b-button>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import ModalSelectJudge  from '@/components/CreateLpp/ModalSelectJudge.vue'
import ModalSelectParticipant from '@/components/CreateLpp/ModalSelectParticipant.vue'
import ModalSetRounds from '@/components/CreateLpp/ModalSetRounds.vue'
import ModalBindJudges from '@/components/CreateLpp/ModalBindJudges.vue'
import ModalClearAllResults from '@/components/CreateLpp/ModalClearAllResults.vue'
import ModalSetTables from '@/components/CreateLpp/ModalSetTables.vue'
import Loader from '@/components/Loader'
import Navigation  from '@/components/Navigation.vue'

export default {
    components:{
        ModalClearAllResults,
        ModalSelectJudge,
        ModalSelectParticipant,
        ModalSetRounds,
        ModalBindJudges,
        ModalSetTables,
        Loader,
        Navigation,
    },
    methods:{
       goToAdmin(){
        this.$router.push({name:'adminLpp'})
       }
    },
    computed:{
       
    },
    data(){
        return{
            loadingStatus:true,
            showModal:{
                SelectJudge:false,
                SelectParticipant:false,
                SetRounds:false,
                BindJudges:false,
                SetTables:false,
                ClearAllResults:false,
            },
        }
    },
    async mounted(){
        await this.$store.dispatch('createLpp/gamesList')
        await this.$store.dispatch('lpp/judgesList')
        await this.$store.dispatch('createLpp/participantList')
        await this.$store.dispatch('createLpp/roundList')
        await this.$store.dispatch('createLpp/tableList')
        this.loadingStatus=false
    }
}
</script>
<style scoped lang="scss">
    .card{
    background:white;
    padding:5%;
    }
    select{
        border:2px solid rgb(50,200,50);
    }
    .btn{
        background:rgba(60,120,60,1);
        border: none;
        color:white;
    }
    .btn:hover{
        background:rgba(50,120,50,0.9);
    }
    .btn-passive{
        border-radius:0;
        background:#e6e6e6;
        border: none;
        color:black;
        margin:2%;
    }
    .btn-danger{
        border-radius:0;
        background:rgb(200,50,50);
        border: none;
        color:black;
        margin:2%;
    }
    .btn-danger:hover{
        background:rgb(180,30,30);
        color:black;
    }
    .btn-passive:hover{
        background:#d6d6d6;
        color:black;
    }
</style>
