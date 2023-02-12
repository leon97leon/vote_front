<template>
    <div>

   
    <Navigation></Navigation>
    <div class="container">
        <div class="row justify-content-end">
            <div class="col-md-6 col-12" style="text-align:left">
                <h1>Вопросы опроса {{quiz_one.name}}</h1>
            </div>
            <div class="col-md-6 col-7 mb-1 " style="text-align:right">
                <b-button class="align-middle" variant="success" :to="{name:'updateQuiz',params:{'id':quiz_one.id}}">Редактировать опрос</b-button> 
            </div>
        </div>

    <div class="admin-table" style="overflow-x:auto">
        <div class="admin-table__spinner" >
            <!-- <p v-if="loadingStatus" >Загружаем</p> -->
            <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                label="Spinning"></b-spinner>

        </div>
        <table class="table table-hover" style=" vertical-align: middle; min-width: 1000px;">
            <thead class="table--theader">
                <tr>
                    <td> Раздел вопроса</td>
                    <td> № </td>
                    

                    <td class="w-50"> Вопрос</td>

                    <td> Формат ответа</td>
              
                </tr>
            </thead>
            <tbody>
                
                <template  v-for="(item,i) in quiz_one.part">
                    <!-- <tr v-for="(ques,j) in item.question" :key="`c${i}${j}`"> -->
                    
                    <tr v-for="(ques,j) in item.question" :key="`c${i}${j}`">
                        <td>{{item.name}}</td>
                        <td>{{j+1}}</td>
                        <td>{{ques.body}}</td>
                        <td v-if="ques.answer_type == 3">Произвольный текст</td>
                        <td v-if="ques.answer_type == 1">Один из списка</td>
                        <td v-if="ques.answer_type == 2">Несколько из списка</td>
                        <td v-if="ques.answer_type == 4">Чек-бокс</td>
                        <td v-if="ques.answer_type == 5">Вопрос со ставкой</td>
                        <td v-if="ques.answer_type == 6">Вопрос со штрафом</td>
                    </tr>
                </template>
                
             </tbody>
     
        </table>
   
    </div>
</div>
</div>
</template>
<script>
import { mapState } from 'vuex';
import Navigation from '../../../components/Navigation.vue';
export default {
    data() {
        return {
            table: {
                id: 1,
            }
        };
    },
    props:['id'],
    
    async mounted() {
        this.loadingStatus=true
        await this.$store.dispatch('quiz/partList',this.id)
        //await this.$store.dispatch('lpp/judgesList')
        this.loadingStatus=false
    },
    computed: mapState ({
        quiz_one: state => state.quiz.part_one,

    }),
   
    components: { Navigation }
}
</script>
<style>
td {
    text-align: center;
    border: 1px solid grey;
    font-weight:bold;
}
.table-button{
    height: min-content;
    width: min-content ;
    border:1px solid;
    background: orange!important;;
}
.table-button:hover{
    background: rgb(247, 230, 2)!important;;
    
}
thead td{
    background: #ACE2C8 !important; 
}
td{
   width: 40px;
   vertical-align: top;
}
tbody td{
    padding: 10px 0;
}
</style>