<template>
<div>
    <button :class="{ 'btn-success':allClosed ,  'btn-danger':!allClosed, 'btn':true}" style="font-size:8px" @click="changeAllStatus">{{Label}}</button>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default { 
    components:{
    },
    props:[
        'round_finished',
        'numRound'
    ], 
    computed:{
        ...mapState({
            judgesList: state => state.lpp.judgesList,
        }),
        allClosed(){
            let out=true
            this.judgesList.forEach(el=>{
                out = el[this.round_finished] && out
            })
            return out
        },
        Label(){
            if (this.allClosed) return 'Закрыт'
            return 'Открыт'
        }
    },
    methods:{
        changeAllStatus(){
            let promises=[]
            if (this.allClosed){
                this.judgesList.forEach(el=>{
                    promises.push(
                        this.$store.dispatch('lpp/openRound',{
                            judgeID:el.id,
                            numRound:this.numRound
                    }))
                })
            }else{
                this.judgesList.forEach(el=>{
                    promises.push(
                        this.$store.dispatch('lpp/closeRound',{
                            judgeID:el.id,
                            numRound:this.numRound
                    }))
                })
            }

            Promise.all(promises)
            .catch(error=>{
                console.log(error)
            })
        }
    },
    data(){
        return{
            
        }
    },
    async mounted(){

    }
}
</script>
<style scoped lang="scss">
</style>
