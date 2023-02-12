<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-lg-6  col-12">Журнал регистрации участников</h2>

        </div>
        <div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner" >
                <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                label="Spinning"></b-spinner>
                
            </div>
            <table class="table table-hover" style=" vertical-align: middle; min-width: 1200px;">
                <thead class="table--theader">
                    <tr>
                        <td style="width:150px"> Название опроса</td>
                        <td> Фамилия</td>
                        <td> Имя</td>
                        <td> Эл. почта</td>
                        
                        <td>ТБ</td>
                        <td>Отдел/вертикаль</td>
                        <td>Должность</td>
                        <td style="width:150px">Пройден опрос (Да/Нет)</td>
                        
                        
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="item in this.res.part">
                        <td>{{res.name}}</td>
                        <td>{{item.familia}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.tb}}</td>
                        <td>{{item.position}}</td>   
                        <td>{{item.department}}</td>
                        <td>{{item.result}}</td>
                    </tr>
        
             </tbody>
              
         </table>
        
     </div>
    </div>
    </template>
 <script>
     import { mapState } from 'vuex';
export default {
    data() {
        return {
            loadingStatus:false,
        };
    },
    props: ['id'],
    async mounted() {
        this.$store.dispatch('quiz/reg_svod', {'id_quiz':this.id})
    },
    computed: mapState({
            res: state => state.quiz.reg_svod.res,
        }),
    activated(){
        this.$store.dispatch('quiz/reg_svod', {'id_quiz':this.id})
    }

}
    </script>
