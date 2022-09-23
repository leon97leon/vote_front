<template>
<div >
    <div v-if="loadingStatus" class="text-center">
        <Loader/>
    </div>
    <div class="text-center container card" style="padding-top:5%" v-else>
        <div class="circle-image mx-auto d-block" style="margin-bottom:2%">
            <img class=""
                :src="judge.portrait" 
                @error="errorImg"
            />
        </div>
        <p>Жюри: <span style="font-weight: 700">{{ judge.name }}</span></p>
        <p>Оценивает</p>
        <div style="background-color:#e6e6e6; width:120px; margin:0 auto 0 auto">
            <p style="padding:10%">Команду {{tableID}}</p>
        </div>
        <div style="margin-top: 3%">
            <input type="radio" class="btn-check" name="options" id="r1" value="1" v-model="numRound" autocomplete="off">
            <label :class="{btnPassive: true, btnSelected: numRound===1}" for="r1" @click="numRound=1">Раунд 1</label>      

            <input type="radio" class="btn-check" name="options" id="r2" value="2" v-model="numRound" autocomplete="off">
            <label :class="{btnPassive: true, btnSelected: numRound===2}" style="margin:0 10px 0 10px" for="r2" @click="numRound=2">Раунд 2</label>
            
            <input type="radio" class="btn-check" name="options" id="r3" value="3" v-model="numRound" autocomplete="off">
            <label :class="{btnPassive: true, btnSelected: numRound===3}" for="r3" @click="numRound=3">Раунд 3</label>
        </div>
        <div style="margin-top: 4%">
            <keep-alive>

                <Rounds :numRound="+this.numRound" :key="+this.numRound"/>
            </keep-alive>
        </div>
    </div>
</div>
 
</template>

<script>
import Loader from '@/components/Loader'
import Rounds from '@/components/lpp/Rounds'
const images = require.context('@/assets/', false, /\.png$/)

export default {
    name: "Game",  
    components:{
        Loader,
        Rounds,
    },
    computed:{
        tableID(){
            return this.$store.getters['lpp/tableID'](this.numRound-1)
        },
        judge(){
            return this.$store.getters['lpp/authJudge']
        },
        numRound:{
            get(){
                console.log(this.$store.getters['lpp/numRound'])
                return this.$store.getters['lpp/numRound']
            },
            set(numRound){
                this.$store.commit('lpp/numRound',numRound)
            }
        }
    },
    data(){
        return{
            loadingStatus:true,
        }
    },
    methods:{
        errorImg(event){
            event.target.src=images('./defaultJudge.png')
        },
    },
    async created(){
        await this.$store.dispatch('createLpp/roundList')
        await this.$store.dispatch('lpp/getGamesList',this.$store.getters['lpp/authJudge'].id)
        await this.$store.dispatch('lpp/loginJudge',{email:this.$store.getters['lpp/authJudge'].email,validationCode:this.$store.getters['lpp/authJudge'].validation_code})
        .then(response => {
          this.$store.commit('lpp/loginJudge',response.data.judge)
        })
        .catch(error=>{
            this.$store.commit('lpp/errorLoginHandler',error.response.status)
        })
        this.loadingStatus = false
        setInterval(async () =>  {
            await this.$store.dispatch('lpp/loginJudge',{email:this.$store.getters['lpp/authJudge'].email,validationCode:this.$store.getters['lpp/authJudge'].validation_code})
            .then(response => {
                this.$store.commit('lpp/loginJudge',response.data.judge)
            }).catch(err=>{
                console.log(err.response)
            })}
        ,4 * 1000)
        
    }
  
}
</script>
<style scoped lang="scss">
.btnPassive{
    border-radius:0;
    background:#e6e6e6;
    border: none;
    color:black;
    padding:10px;
}
.btnSelected{
    background:green;
    color:white;
}

</style>
