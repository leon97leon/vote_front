<template>
<div class = "row">
    <div class="col-6">
        <p style="font-weight:700">{{judge.name}}</p>
    </div>
    
    <div class="col-2" v-for="numRound in [1,2]" :key="numRound" style="margin-bottom:5%">
        <img class="img" :src="imagePath(numRound)" @click="changeRoundStatus(numRound)"/>
    </div> 
</div>
</template>

<script>
const images = require.context('@/assets/', false, /\.png$/)
export default {
    name: "",  
    components:{
    },
    props:[
        'judge'
    ],
    methods:{
        imagePath(numRound){
            if (this.roundIsFinished(numRound)) {
                return images('./accept.png')
            }else{
               return images('./times.png')
            }
        },
        roundIsFinished(numRound){
            if (numRound===1) return this.judge.round_1_finished
            if (numRound===2) return this.judge.round_2_finished
            if (numRound===3) return this.judge.round_3_finished
            return false
        },
        async changeRoundStatus(numRound){
            if (this.roundIsFinished(numRound)){ 
                await this.$store.dispatch('lpp/openRound',{judgeID:this.judge.id,numRound}) 
            }else{ 
                await this.$store.dispatch('lpp/closeRound',{judgeID:this.judge.id,numRound}) 
            }
        }
    },
    data(){
        return{
            loadingStatus:false,
        }
    },
    async mounted(){

    }
}
</script>
<style scoped lang="scss">
.img:hover{
    cursor:pointer;
}
.img{
    width:30px;
    width:30px;
}
</style>
