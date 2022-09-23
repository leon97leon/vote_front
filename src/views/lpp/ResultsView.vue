<template>
<div>
    <Navigation/>
    <div class="container card">
        <div v-if="loadingStatus" class="text-center">
            <Loader/>
        </div>
        <div style="padding:5% 0 5% 0" v-else>
            <div class="text-center">
                <div style="display:block">
                    <h1>Результаты конкурса </h1>
                </div>
                <div style="display:block"> 
                    <h1>Лучший по профессии</h1>
                </div> 
            </div>
            <div v-if="this.diagramData.labels.length">
                <div style="text-align:center; margin:0% 0 5% 0">
                    <a :href="linkExelResults">Выгрузить результаты в excel</a>
                </div>

                <div class="vote-dashboard">
                    <rating-diagram :data-to-visualize-labels="diagramData.labels"
                                    :data-to-visualize-values="diagramData.scores"
                                    :data-to-visualize-colors="diagramData.colors"
                                    label-text="Количество баллов"
                                    style="padding:2% 0 2% 0"
                                    >
                    </rating-diagram>
                </div>
            </div>
            <h2 v-else style="text-align:center; margin:5% 0 5% 0">Результатов нет</h2>
        </div>

    </div>
</div>
</template>

<script>
import RatingDiagram from "@/components/lpp/RatingDiagram";
import Navigation  from '@/components/Navigation.vue'
import Loader from '@/components/Loader'
import config from '@/scripts/api-config'

const API_URL = config['API_LOCATION'] + 'api/bestlp/'

export default { 
    methods: {
        generateChartColors(scoresList){
            let basicColor = '#108af6';
            let winnerColor = 'orange';
            let maxValue = 0;
            let colorsList = new Array(scoresList.length).fill(basicColor);
            for (var i = 0; i < scoresList.length; i++) {
                if (scoresList[i] > maxValue) {
                maxValue = scoresList[i];
                }
            }
            for (var j = 0; j < scoresList.length; j++) {
                if (scoresList[j] == maxValue) {
                colorsList[j] = winnerColor
                }
            }
            return colorsList;
        },
    },

    components:{
        Loader,
        RatingDiagram,
        Navigation,
    },
    computed:{
        diagramData(){
            let data=this.$store.getters['lpp/diagramData']
            data.colors=this.generateChartColors(data.scores)
            return data 
        }
    },
    data(){
        return{
            loadingStatus:true,
            linkExelResults:'#',
        }
    },
    mounted(){
        this.linkExelResults=API_URL+'participants/excel-load/'
        setInterval(async () =>  {
            await this.$store.dispatch('lpp/getTotalScore')}
        ,5 * 1000)
    },
    async beforeMount(){
        await this.$store.dispatch('lpp/getTotalScore')
        this.loadingStatus = false
    }
}
</script>
<style scoped lang="scss">
#link{
  color:green;
}
#link:hover{
  color:blue;
  cursor:pointer;
}
</style>
