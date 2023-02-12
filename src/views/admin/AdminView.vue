<template>
<div>
    <Navigation/>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-lg-6 col-md-7" style="text-align:left">
                <h1 style="font-size:30px">Страница администратора</h1>
            </div>
            <div class="col-sm-12 col-lg-6 col-md-5" style="text-align:right">
                <b-button class="align-middle" variant="success" :to="{name:'createQuiz'}">+ Создать новое голосование</b-button> 
            </div>
        </div>
        <h4 class="mt-4">{{fio.fio}}</h4>
        <h4  class="mt-4">Роль: организатор</h4>
        <h4  class="mt-4">Опросы</h4>
        <AdminViewTable></AdminViewTable>
 
    </div>  
  </div>
</template>
<script>
import { mapState } from 'vuex';
import Navigation  from '@/components/Navigation.vue';
import AdminTable  from '@/components/Admin/AdminTable.vue';
import AdminViewTable  from '@/views/admin/AdminViewTable/AdminViewTable.vue';
export default {
    data(){
        return{
            items: [

            ],
        }
    },
   
    computed: mapState ({
        fio: state => state.quiz.fio,

    }),
    created(){

    },
    components: {
        Navigation,
        AdminTable,AdminViewTable
    },
    async mounted() {
        this.loadingStatus = false
        await this.$store.dispatch('quiz/fio')
        console.log(this.fio)
    }
    
}
</script>
<style>
.button-wrapper {
  display: table;
  text-align: center;
  width: 100%;
}
.button-wrapper-inner {
  vertical-align: middle;
  display: table-cell;
}

</style>