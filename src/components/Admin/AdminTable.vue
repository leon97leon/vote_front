<template>
    <div class="admin-table">
        <!-- <div class="admin-table__spinner">
            <p v-if="loadingStatus" >Загружаем</p>
            <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow" label="Spinning"></b-spinner>
        
        </div> -->
        <table class="table table-hover" style=" vertical-align: middle; ">
        <thead class="table--theader">
             <tr>
            <td> Название  </td>
            <td> Дата изменения</td> 
            
            <td> Ответы</td> 
            
            <td> Ссылка </td>
            <td> Обновить результаты</td> 

            <td> Выгрузить в Excel </td>
            <td> Удалить </td>
            <td> Редактировать </td>
            </tr> 
        </thead>
        <tbody>
            <b-spinner variant="success" label="Spinning"></b-spinner>
            <tr v-for="item in allQuiz" :key="item.id">
                <td > {{item.name}} </td>
                <td> {{item.author[0].first_name}} </td> 
                <td><a class="admin-table__filds--answer"  href="#" @click='checkAnswer()'><font-awesome-icon icon="fa-solid fa-list-check" /></a></td> 
                <td><a class="admin-table__filds--link"  :href="`${item.link}`"><font-awesome-icon icon="fa-solid fa-link" /></a> </td> 
                <td><a class="admin-table__filds--update" href="#" @click='update()'><font-awesome-icon icon="fa-solid fa-arrow-rotate-right" /></a></td> 
                <td><a class="admin-table__filds--excel" href="#" @click='uploadExcel()'><font-awesome-icon icon="fa-solid fa-file-excel" /></a></td> 
                <td><a class="admin-table__filds--delete" href="#" @click='deleteQuiz(item.id)'><font-awesome-icon icon="fa-solid fa-x" /></a> </td> 
                <td><a class="admin-table__filds--edit" href="#" @click='uploadExcel()'><font-awesome-icon icon="fa-solid fa-pen-to-square" /></a></td> 
            </tr> 
        </tbody>
        </table>
        <div class="admin-table__page-controll">
            <div class="admin-table__page-controll__page-controll--previos">
                <button class="page-controll__previos" @click="previosPage()"><font-awesome-icon icon="fa-solid fa-angle-left" /></button>
            </div>
            <div class="admin-table__page-controll__page-controll--next">
                <button class="page-controll__next"  @click="nextPage()"><font-awesome-icon icon="fa-solid fa-angle-right" /></button>
            </div>
        </div>
        
        <thead class="table--theader">
            <tr>
            <td> Название опроса </td>
            <td> Дата изменения</td> 
            
            <td> Статус </td>
            <td> Ответы</td> 
            
            <td> Ссылка на опрос </td>
            <td> Обновить результаты</td> 

            <td> Выгрузить в Excel </td>
            <td> Удалить результаты</td> 
            </tr> 
        </thead>
        <tbody class="table--tbody">
            <tr v-for="item in dataQuiz" :key="item">

            </tr> 
        </tbody>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    props: [],

    created(){
        
       
    },

    computed: mapState({

    }),
    methods:{
        nextPage(){
            window.scrollTo(0,0)

        },
        previosPage(){  

        },
        filterContentFromAPI(routeObject) {

        },
        deleteQuiz(id){

        }
    }

}
</script>