<template>

<div style="text-align:left; margin-bottom:8%">
    <div class="row" >
        <div class="col-sm-4 col-md-3 col-lg-3 col-xs-12">
            <div class="circle-image-participant mx-auto d-block">
                <!-- circle-image-participant -->
                <img 
                    style="display:inline"
                    :src="participant.portrait" 
                    alt="Image not found"
                    @error="errorImg"
                />
            </div>
        </div>
        
        <div class="col-sm-8 col-md-9 col-lg-9 col-xs-12">
            <p style="text-align:left; font-weight: 700; margin-top: 20px">{{participant.name}}</p>
            <p style="text-align:left; margin:0">{{participant.tb.full_name}}</p>
            <p style="text-align:left; margin:0">{{participant.department.short_name}}</p>
            <div class="row" style="font-weight: 700">
                <div class="col-6">
                    <p style="text-align:left">Общий счет раунда: <span>{{(Number(score.self_management)+Number(score.result_management)+Number(score.client_centricity)).toFixed(1)}}</span></p>
                </div>
                <div class="col-6">
                    <p style="text-align:right; margin-right:5%;">Ранг этапа: <span>{{partisipantRank}}</span></p>
                </div>
            </div>
        </div>
    </div>
    <div>
        <SelectScore 
            :title="'Управление результатом/ответственность'" 
            :score="this.score.result_management"
            :scoreArr="scoreArr"
            :disabled="disabled"
            @update-score="updateResultScore"
        />
        <SelectScore 
            :title="'Управление собой'" 
            :score="this.score.self_management"
            :scoreArr="scoreArr"
            :disabled="disabled"
            @update-score="updateSelfScore"
        />
        <SelectScore 
            :title="'Клиентоцентричность'" 
            :score="this.score.client_centricity"
            :scoreArr="scoreArr"
            :disabled="disabled"
            @update-score="updateClientScore"
        />
    </div>
</div>

</template>

<script>
import SelectScore from '@/components/lpp/SelectScore'
import { mapState } from 'vuex'
const images = require.context('@/assets/', false, /\.png$/)
export default {
    name: "Rounds",  
    components:{
        SelectScore,
    },
    data(){
        return{
            score:this.inScore,
        }
    },
    props:[
        'roundID',
        'participant',
        'inScore',
        'rankScore',
        'disabled',
    ],
    computed:{
        scoreArr(){
            return this.$store.getters['lpp/scoreArr'](this.roundID)
        },
        partisipantRank(){
            if (this.rankScore.length){
                return this.rankScore.find(el=>el.participantID===this.participant.id).label
            }else{
                return 0
            }
        },
        roundData(){
            return this.$store.getters['lpp/roundData'](this.roundID)
        },
    },
    methods:{
        updateSelfScore(value){
            this.score.self_management=value
            this.$emit('update-score',{score:this.score,participantID:this.participant.id})
        },
        updateResultScore(value){
            this.score.result_management=value
            this.$emit('update-score',{score:this.score,participantID:this.participant.id})
        },
        updateClientScore(value){
            this.score.client_centricity=value
            this.$emit('update-score',{score:this.score,participantID:this.participant.id})
        },
        errorImg(event){
            event.target.src=images('./defaultParticipant.png')
        },
    },
}
</script>

<style scoped lang="scss">

</style>
