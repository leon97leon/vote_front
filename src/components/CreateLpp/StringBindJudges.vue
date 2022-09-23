<template>
<div>
<div class=row>
    <div class="col-6">
        <p>{{judge.name}}</p>
    </div>
    <div class="col-2">
        <SelectBindJudges
            :game="findGame(roundList.find(el=>el.id===1).id)"
            :round="roundList.find(el=>el.id===1).id"
            :judge="judge.id"
        />
    </div>
    <div class="col-2">
        <SelectBindJudges
            :game="findGame(roundList.find(el=>el.id===2).id)"
            :round="roundList.find(el=>el.id===2).id"
            :judge="judge.id"
        />
    </div>
    <div class="col-2">
        <SelectBindJudges
            :game="findGame(roundList.find(el=>el.id===3).id)"
            :round="roundList.find(el=>el.id===3).id"
            :judge="judge.id"
        />
    </div>
</div>
</div>
</template>
<script>
import { mapState } from 'vuex'
import SelectBindJudges from "@/components/CreateLpp/SelectBindJudges.vue"
export default {
    components:{
        SelectBindJudges
    },
    props:[
        'judge',
    ],
        computed:{
        ...mapState({
            roundList: state => state.createLpp.roundList,
            gamesList: state => state.createLpp.gamesList,
        }),
    },
    methods:{
        findGame(roundId){
            let ind = this.gamesList.findIndex(el=>el.judge===this.judge.id && el.round===roundId)
            if (ind!==-1){
                return this.gamesList[ind]
            }else{
                return null
            }
        },
    },
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
