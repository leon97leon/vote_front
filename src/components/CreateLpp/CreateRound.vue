<template>
<div style="border: 1px solid rgba(50,200,50,0.2); margin:2%">
<div class="container">
    <div>
        <p style="font-weight:700; font-size:18px; color:green">Раунд {{round.number}}</p>
    </div>
    <div class="row" style="margin-bottom:1%">
        <div class="col-8">
            <p style="font-weight:400; font-size:18px">Максимальная оценка</p>
        </div>
        <div class="col-4">
            <input style="width: 50px" type="number"  min="0" @change="changeRound" v-model="round.max_score"/>
        </div>
    </div>
    <div class="row" style="margin-bottom:1%">
        <div class="col-8">
            <p style="font-weight:400; font-size:18px">Шаг оценки</p>
        </div>
        <div class="col-4">
            <input style="width: 50px" type="number"  min="0.1" step="0.1" @change="changeRound" v-model="round.step_score"/>
        </div>
    </div>
</div>
</div>
</template>
<script>
export default {
    props:[
        'roundId'
    ],
    methods:{
        changeRound(){
            this.$store.commit('createLpp/changeRound',this.round)
        }
    },
    mounted(){
        this.round.number=this.$store.getters['createLpp/roundById'](this.roundId).number
        this.round.step_score=this.$store.getters['createLpp/roundById'](this.roundId).step_score
        this.round.max_score=this.$store.getters['createLpp/roundById'](this.roundId).max_score
    },
    data(){
        return{
            showModal:false,
            round:{
                id:this.roundId,
                number:null,
                step_score:null,
                max_score:null,
            }
        }
    }
}
</script>
<style scoped lang="scss">
    input{
        border:2px solid rgb(50,200,50);
    }
    .img{
        height:15px;
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
    .btn-passive:hover{
        background:#d6d6d6;
    }
</style>