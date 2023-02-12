<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-md-5 col-lg-3 col-8">Отчет "Вопрос"</h2>

        </div>
        <div>
<h3>Название опроса</h3>
<h6>{{this.res.name}}</h6>
    <div v-for="(item,index) in this.res.svod">
        <h3>Вопрос {{index+1}}</h3>
        <h6>{{item.body}}</h6>
        <div class="row justify-content-start">
            <h6 class="col-2" style="width:min-content">Ответили:</h6>
            <h6 class="col-1">{{item.ans_kol}} {{item.ans_kol_per}}%</h6>

        </div>
        <div class="row justify-content-start">
            <h6 class="col-2" style="width:min-content">Пропустили:</h6>
            <h6 class="col-1">{{item.prop_kol}} {{item.prop_kol_per}}%</h6>

        </div>

        <h3>Ответы</h3>
        <div class="admin-table" style="overflow-x:auto">
                    <div class="admin-table__spinner">
                        <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                        <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                            label="Spinning"></b-spinner>

                    </div>
                    <div class="row justify-content-start justify-content-md-center">

                        <table class="table table-hover " style=" vertical-align: middle; min-width: 500px; max-width: 1000px;">
                            <thead class="table--theader">
                                <tr>
                                    <td></td>
                                    <td style="width:140px"> Кол-во голосов </td>
                                    <td  style="width:120px"> Процент</td>
                                    
                                    
                                </tr>
                            </thead>

                            <tbody v-for="(choice,index2) in item.svod">
                                <td>{{choice.name}}</td>
                                <td>{{choice.golos}}</td>
                                <td>{{choice.percent}}</td>
                                
                        </tbody>
                        
                    </table>
                </div>
                    
                </div>
            </div>
            </div>

    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {

        };
    },
    props: ['id'],
    async mounted() {
        this.$store.dispatch('quiz/ques_svod', {'id_quiz':this.id})
    },
    computed: mapState({
            res: state => state.quiz.ques_svod.res,
        }),
    activated(){
        this.$store.dispatch('quiz/ques_svod', {'id_quiz':this.id})
    }

}
</script>
