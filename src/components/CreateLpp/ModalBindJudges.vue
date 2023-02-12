<template>
<div>
<transition name="modal" style="display:block; width:100%">
    <div class="modal-mask" >
    <div class="modal-wrapper" >
    <div class="modal-container" style="display:block; width:80%">
    <slot name="body">
        <div style="text-align:right">
            <img class="img" @click="$emit('close')" src="@/assets/green_times.png"/>
        </div>
        <div style="text-align:left; margin-bottom:2%">
            <h1 style="font-size:25px;">Судейство</h1>
        </div>

        <div style="overflow-y:scroll; max-height:200px; overflow-x:hidden; padding:1%">
            <div v-if="judgesList.length" class="row justify-content-center">
                <div class="row">
                    <div class="col-6">
                        <p style="font-weight:500; color:green; font-size:18px">Жюри:</p>
                    </div>
                    <div class="col-2">
                        <p style="font-weight:500; color:green; font-size:18px">Раунд 1:</p>
                    </div>
                    <div class="col-2">
                        <p style="font-weight:500; color:green; font-size:18px">Раунд 2:</p>
                    </div>
                    <!-- <div class="col-2">
                        <p style="font-weight:500; color:green; font-size:18px">Раунд 3:</p>
                    </div> -->
                </div>
                <div class="row" v-for="itemJudge of judgesList" :key="itemJudge.id" style="margin-bottom:1%">
                    <StringBindJudges :judge="itemJudge"/>
                </div>
            </div>
            <div v-else class="row justify-content-center">
                <p style="text-align:center">Жюри нет</p>
            </div>
        </div>

        <div style="margin-top:2%" class="row">
            <div class="col-8"></div>
            <div class="col-4">
                <b-button class="btn" @click="$emit('close')">Ok</b-button>
            </div>
        </div>
    </slot>
    </div>
    </div>
    </div>
</transition>

</div>
</template>
<script>
import StringBindJudges from "@/components/CreateLpp/StringBindJudges.vue"
import { mapState } from 'vuex'
export default {
    components:{
        StringBindJudges,
    },
    async beforeMount(){
        await this.$store.dispatch('createLpp/gamesList')
    },
    computed:{
        ...mapState({
            roundList: state => state.createLpp.roundList,
            judgesList: state => state.lpp.judgesList,
        }),

    },
    data(){
        return{
            showModal:false,
        }
    }
}
</script>
<style scoped lang="scss">
    .img{
        height:25px;
    }
    .img:hover{
        cursor:pointer;
    }
    .btn{
        margin-top:2%;
        background:rgba(60,120,60,1);
        border: none;
        color:white;
    }
    .btn:hover{
        background:rgba(50,120,50,0.9);
    }
    .btn-passive{
        border-radius:0;
        margin-top:2%;
        background:#e6e6e6;
        border: none;
        color:black;
    }
    .select{
        border:2px solid rgb(50,200,50);
    }
    .btn-passive:hover{
        background:#d6d6d6;
    }
</style>
