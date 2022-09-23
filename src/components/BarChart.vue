<script>
   import { Bar, mixins } from 'vue-chartjs';
   import { HorizontalBar } from 'vue-chartjs'
   import ChartDataLabels from "chartjs-plugin-datalabels";
   const { reactiveProp } = mixins

   export default {
     name: 'BarChart',
     extends: HorizontalBar,
     mixins: [reactiveProp],
     plugins: [ChartDataLabels],
     props: ['chartData', 'options'],

     mounted () {
       this.addPlugin(ChartDataLabels);
       this.renderChart(this.chartData, this.options)
     },
     components: {
       ChartDataLabels
     }
   }
</script>


<style scoped>

</style>