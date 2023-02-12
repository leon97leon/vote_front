<template>
    <div>
        <Navigation></Navigation>
        <div class="container">

            <div class="row justify-content-md-between justify-content-end">
                <h1 class="col-md-6 col-sm-6">Сервис оценки СВА</h1>
                <router-link class="col-md-2 col-6" tag="a" :to="{path:'/adminQuiz/'}">
                    <h5 class="text-end">Личный кабинет</h5>
                </router-link>

            </div>
            <div class="row mt-3 justify-content-center mb-3" style="margin:0 auto 0 auto ">
                <h4>Разделы:</h4>
                <table class="table table-hover" style=" vertical-align: middle; max-width: 1000px;">
                    <thead class="table--theader">
                        <tr>
                            <td style="width:150px"> Наименование раздела</td>
                            <td> Поменять статус</td>



                        </tr>
                    </thead>

                    <tbody>
                        <tr v-for="(item,index) in quiz_one.part" :key="item.id">
                            <td>{{item.name}}</td>
                            <td v-if="item.status"><button @click="changestatuspart(item.id)" style="width:max-content"
                                    class="btn btn-danger table-button">Открыт</button></td>
                            <td v-else><button @click="changestatuspart(item.id)" style="width:max-content"
                                    class="btn btn-danger table-button">Закрыт</button></td>
                        </tr>        
                    </tbody>

                </table>
            </div>


        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Navigation from '@/components/Navigation.vue';
import { watch } from 'fs';


export default {
    data() {
        return {
            status: 'closed'
        }
    },
    props:['id'],
    computed: {

    },
    async mounted() {
        this.loadingStatus=true
        await this.$store.dispatch('quiz/partList',this.id)
        //await this.$store.dispatch('lpp/judgesList')
        this.loadingStatus=false
    },
    computed: mapState ({
        quiz_one: state => state.quiz.part_one,

    }),
    methods: {
        
        async changestatuspart(part_id){
            await this.$store.dispatch('quiz/changestatuspart',{'id':this.id,'part_id':part_id})
            await this.$store.dispatch('quiz/partList',this.id)

        }
    }
 

}



</script>
<style>
.btnPassive {
    border-radius: 0;
    background: #e6e6e6;
    border: none;
    color: black;
    padding: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: center;
}

.btnSelected {
    background: green;
    color: white;
    width: 100%;
    text-align: center;
    margin-bottom: 10px;
}

.btnPassive:hover,
.btnSelected:hover {
    cursor: pointer;
}
</style>