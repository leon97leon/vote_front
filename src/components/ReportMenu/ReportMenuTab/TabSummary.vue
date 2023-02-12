<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-2">Сводка</h2>

        </div>
        <div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner">
                <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                    label="Spinning"></b-spinner>

            </div>
            <table class="table table-hover" style=" vertical-align: middle; min-width: 1200px; background-color: None;">
                <thead class="table--theader">
                    <tr>
                        <td>Название опроса </td>

                        <td>Дата открытия</td>
                        <td>Дата закрытия</td>
                        <td>Количество регистраций</td>
                        <td>Начато опросов</td>
                        <td>Завершено опросов</td>

                        <td>Последняя запись </td>
                        <td>Статус опроса</td>

                    </tr>
                </thead>

                <tbody>
                    <td>{{this.res.name}}</td>
                    <td>{{this.res.open_time}}</td>
                    <td>{{this.res.close_time}}</td>
                    <td>{{this.res.reg}}</td>
                    <td>{{this.res.start}}</td>
                    <td>{{this.res.finish}}</td>
                    <td>{{this.res.update}}</td>
                    <td v-if = "this.res.status">Открыт</td>
                    <td v-else>Закрыт</td>
                    
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
        this.$store.dispatch('quiz/quiz_svod', {'id_quiz':this.id})
    },
    computed: mapState({
            res: state => state.quiz.quiz_svod.res,
        }),

}
</script>
