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
                        <td style="width:150px"> Статус участника (админ, организатор, участник опроса, жюри)</td>
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
                    <td>КВИЗ</td>
                    <td></td>
                    <td>Иванов</td>
                    <td>Иван</td>
                    <td>pochta@pochta.ru</td>
                    <td>ББ</td>
                    <td>ОПИР</td>   
                    <td>Аудитор</td>
                    <td>Да</td>
        
             </tbody>
              
         </table>
        
     </div>
    </div>
    </template>
 <script>
     
     export default {
         data() {
             return {
                 
            };
        },
        props: [],
        
    }
    </script>
