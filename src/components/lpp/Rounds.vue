<template>
<div>
    <div class="row justify-content-center" style="margin:0% 0 5% 0">
        
        <table class="table table-bordered">
            <tbody class="tableScale">
                <tr class="tableScale">
                    <td style="overflow:hidden" scope="col" v-for="el in scoreArr">{{el}}</td>
                </tr>
            </tbody>
        </table>

        <p v-if="roundIsFinished" style="color:rgba(255,0,0,0.5)">
            Данный раунд завершен
        </p>
    </div>
    <div v-for="item of participantRound" :key="item.id">
        <keep-alive>

            <ParticipantScore :participant="item" :roundID="roundData.id" 
                :inScore="getCurrentScore(item.id)" @update-score="addScore"
                :rankScore="rankScore"
                :disabled="sendingStatus || roundIsFinished"
            />
        </keep-alive>
    </div>
    <div style="margin-bottom:10%;" >
        <p v-if="roundIsFinished" style="color:green; font-weight:700">Оценка принята</p>
        <b-button v-else class="btn-passive" @click="sendRoundScores" 
            style="padding:0; max-width:200px" 
            :disabled="sendingStatus || roundIsFinished"
        >
            <span v-if="!sendingStatus">Завершить раунд</span>
            <div v-else class="spinner-border" role="status">
            <span class="sr-only"></span>
            </div> 
        </b-button>

    </div>
    
</div>
</template>

<script>
import ParticipantScore from '@/components/lpp/ParticipantScore'

export default {
    name: "Rounds",  
    components:{
        ParticipantScore,
    },
    props:[
        'numRound',
    ],
    methods:{
        addScore({score,participantID}){
            const ind=this.allScoresToSend.findIndex(el=>el.participantID===participantID)
            this.allScoresToSend[ind]={...this.allScoresToSend[ind],...score}
            this.rankScore=this.calcRankScore()
        },

        calcRankScore(){
            let arr=[]
            for (let item of this.allScoresToSend) {
                arr.push({
                    participantID:item.participantID, 
                    score:Number(item.client_centricity)+Number(item.self_management)+Number(item.result_management),
                    rank:0,
                    label:'',
                })
            }

            arr=arr.sort((a,b)=>b.score-a.score)
            arr.forEach((el,ind,a)=>{
                el.rank=a.findIndex(aEl=>aEl.score===el.score)+1
            })
            let d=0
            arr.forEach((el,ind,a)=>{
                if (ind>0 && el.rank-a[ind-1].rank>d+1 && el.score!==a[ind-1].score){
                    d=el.rank-a[ind-1].rank-1
                }
                el.rank-=d
                el.label=String(el.rank)
            })

            return arr
        },


        async sendRoundScores(){
            this.sendingStatus=true
            let maySend=true
            for (let item of this.allScoresToSend){
                maySend=maySend && item.self_management!==null
                maySend=maySend && item.result_management!==null
                maySend=maySend && item.client_centricity!==null
            }
            
            if(maySend){
                await this.$store.dispatch('lpp/sendRoundScores',this.allScoresToSend)
                .then(async ()=> {
                    await this.$store.dispatch('lpp/closeRound',{numRound:this.numRound,judgeID:this.judge.id})
                    await this.$store.dispatch('lpp/getGamesList',this.$store.getters['lpp/authJudge'].id)
                    
                    if (this.numRound<3){
                        this.$store.commit('lpp/numRound',this.numRound+1)
                        window.scrollTo(0,0)
                    }
                    
                })
                .catch((err)=>{
                    console.log(err)
                    alert('Не удалось закончить раунд')
                }) 
            }else{
                alert('Необходимо заполнить оценки для всех участников')
            }

            this.sendingStatus=false
        },
        getCurrentScore(participantID){
            return this.$store.getters['lpp/currentScore']({
                roundID:this.roundData.id,
                participantID
            }) 
        },
    },
    computed:{
        roundData(){
            return this.$store.getters['lpp/roundData'](this.numRound-1)
        },
        participantRound(){
            return this.$store.getters['lpp/participantRound'](this.numRound-1)
        },
        judge(){
            return this.$store.getters['lpp/authJudge']
        },
        roundIsFinished(){
            if (this.numRound===1){
                return this.judge.round_1_finished
            }
            if (this.numRound===2){
                return this.judge.round_2_finished
            }
            if (this.numRound===3){
                return this.judge.round_3_finished
            }
            return false
        },
    },
    data(){
        return{
            allScoresToSend:[],
            sendingStatus:false,
            rankScore:[],
            scoreArr:[],
        }
    },
    beforeMount(){        
        this.$store.dispatch('lpp/setNumRound',this.numRound)
        for (let item of this.participantRound){
            this.allScoresToSend.push(
                this.$store.getters['lpp/currentScore']({
                    roundID:this.roundData.id,
                    participantID:item.id
            })) 
        } 
        this.rankScore=this.calcRankScore()
        if (this.roundData.step_score<=0) this.roundData.step_score=0.1
        for (let ind = 0; ind<=Number(this.roundData.max_score.toFixed(1)); ind+=Number(this.roundData.step_score.toFixed(1))){
            this.scoreArr.push(ind.toFixed(1))
        }
        this.$store.commit('lpp/scoreArr',{scoreArr:this.scoreArr,roundID:this.numRound})
    }
}
</script>
<style scoped lang="scss">
table{
  table-layout:fixed;
}
.tableScale{
    background: linear-gradient(to left,green, white);
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
