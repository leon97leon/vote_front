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
            <table class="table table-hover" style=" vertical-align: middle; width:min-content;min-width: 1000px; max-width: 2000px;">
                <thead class="table--theader">
                    <tr>
                        <td> Название команды/ID</td>
                        <template v-for="items in this.res[0].svod_part">
                        <td>{{items.part}}</td>
                        </template>
                    
                        
                        <td>Итого</td>
                        <td>Ранг</td>
                  
                        
                    </tr>
                </thead>
                
                <tbody>
                    <tr v-for="(item,index) in this.res">
                        <td>{{item.email}}</td>
                        <template v-for="item2 in item.svod_part">
                        <td>{{item2.total}}</td>
                        </template>
                        <td>{{item.itogo}}</td>
                        <td>{{item.rang}}</td>
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

        };
    },
    props: ['id'],
    async mounted() {
        this.$store.dispatch('quiz/part_svod', {'id_quiz':this.id})
    },
    computed: mapState({
            res: state => state.quiz.part_svod.res,
        }),
    activated(){
        this.$store.dispatch('quiz/part_svod', {'id_quiz':this.id})
    }

}
    </script>
<style></style>