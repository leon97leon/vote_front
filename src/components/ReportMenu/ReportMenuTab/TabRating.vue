<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-lg-4  col-8">Рейтинг участников</h2>

        </div>
        <div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner" >
                <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                label="Spinning"></b-spinner>
                
            </div>
            <table class="table table-hover" style=" vertical-align: middle; width:min-content;min-width: 1500px; max-width: 2000px;">
                <thead class="table--theader">
                    <tr>
                        <td> Название команды/ID</td>
                        <td> Раунд 1</td>
                        <td> Раунд 2</td>
                        <td> Раунд 3</td>
                        <td> Раунд 4</td>
                        <td> Раунд 5</td>
                        <td> Раунд 6</td>
                
                        
                        <td>Итого</td>
                        <td>Ранг</td>
                  
                        
                    </tr>
                </thead>
                
                <tbody>
                    <td>Супер-пупер</td>
                    <td>55</td>
                    <td>55</td>
                    <td>66</td>
                    <td>66</td>
                    <td>66</td>
                    <td>66</td>
                    <td>66</td>
                    <td>66</td>
                   
                 
        
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
<style></style>