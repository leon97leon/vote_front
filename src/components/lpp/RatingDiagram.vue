<template>
    <div class="rating__diagram">
      <div class="rating__diagram-container">
          <div class="rating__diagram-chart" >
            <BarChart :chartData="chartData" :options="options" />
          </div>
      </div>
    </div>
</template>

<script>

import {Chart} from 'chart.js';
import BarChart from '@/components/BarChart';
import ChartDataLabels from "chartjs-plugin-datalabels";
Chart.defaults.global.plugins.datalabels.anchor = 'end';
Chart.defaults.global.plugins.datalabels.align = 'end';
Chart.defaults.global.plugins.datalabels.clamp = true;

export default {
  name: "RatingDiagram",
  props: ['dataToVisualizeLabels', 'dataToVisualizeValues', 'dataToVisualizeColors', 'labelText'],
  plugins: [ChartDataLabels],
  components: {
    BarChart
  },
   data () {
    return {
      chartData: null,
      options: null,
      maxValue:null,
    }
  },
  mounted() {
    this.maxValue=Math.max(...this.dataToVisualizeValues)
    this.fillData()
  },
  methods: {
    fillData() {
      this.chartData = {
        labels: this.dataToVisualizeLabels,
        datasets: [{
          label: this.labelText,
          backgroundColor: this.dataToVisualizeColors,
          fill: true,
          data: this.dataToVisualizeValues,
          datalabels: {
            value: {},
            title: {color: 'green'},
            color: 'black'
          }
        }]
      }
      this.options =  {
        maintainAspectRatio: true,
        scales: {
            xAxes: [{
                ticks: {
                    precision: 0,
                    beginAtZero: true,
                    fontColor: 'black',
                    fontWeight: 'bold',
                    suggestedMax:this.maxValue*1.1,
                },
            }],
            yAxes: [{
                ticks: {
                  fontColor: 'black',
                  fontWeight: '900',
                  fontSize: 15,
                },
                font: {
                    size: 20,
                    weight: 'bold'
                }
            }]

        },
        legend: {
          display: false,
          position: 'bottom',
          reverse: true,
          labels: {
            fontSize: 12,
            fontColor: 'black',
            fillStyle: 'red',
            color: 'red',
          }
        },
        layout: {
          padding: {
            top: 30
          }
        },
        plugins: {
            datalabels: {
              color: 'white',
              font: {
                size: 15
              },
              labels: {
                title: {
                  font: {
                    weight: 'bold',
                    size: 20
                  }
                }
              }
           },

            beforeDraw: function(c) {
            var legends = c.legend.legendItems;
              legends.forEach(function(e) {
                 e.fillStyle = 'orange';
              });
            }
        }
      }
    }
  },
  watch: {
    dataToVisualizeLabels() {
      this.maxValue=Math.max(...this.dataToVisualizeValues)
      this.fillData()
    }
  }
}
</script>

<style scoped>

</style>