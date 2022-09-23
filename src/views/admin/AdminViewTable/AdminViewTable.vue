<template>
    <div class="admin-table" style="overflow-x:auto">
        <div class="admin-table__spinner">
            <!-- <p v-if="loadingStatus" >Загружаем</p> -->
            <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                label="Spinning"></b-spinner>

        </div>
        <table class="table table-hover" style=" vertical-align: middle; min-width: 1200px;">
            <thead class="table--theader">
                <tr>
                    <td style="width:3%"> </td>
                    <td style="width:3%"> </td>
                    <td> Название </td>
                    <td> Дата создания</td>

                    <td> Статус</td>

                    <td> Отчет по опросу </td>
                    <td> Ссылка</td>

                    <td>Владелец </td>
                    <td> Кол-во завершенных опросов </td>
                    <td> Очистить ответы </td>
                    <td> Изменить статус раздела опроса </td>
                    <td> Изменить статус опроса </td>
                </tr>
            </thead>

            <tbody>
                <td>{{table.id}}</td>
                <td></td>
                <td>
                    <router-link tag="a" :to="{name:'QuizNum',params:{id:table.id}}"> КВИЗ СВА</router-link>
                </td>
                <td>13.09.2022</td>
                <td>Открыт</td>
                <td>
                    <router-link tag="a" :to="{name:'Report',params:{id:table.id}}">Перейти</router-link>
                </td>
                <td><a href="">123.ru</a>
                    <b-button class="btn btn-warning table-button">Поделиться</b-button>
                </td>
                <td>Фамилия Имя</td>
                <td>3</td>
                <td>
                    <b-button class="btn btn-warning table-button" v-b-modal.modal-2>Очистить</b-button>
                </td>
                <td>
                    <b-button class="btn btn-warning table-button">Открыть/ Закрыть</b-button>
                </td>
                <td>
                    <b-button class="btn btn-warning table-button">Открыть/ Закрыть</b-button>
                </td>

            </tbody>
        </table>
        <b-modal id="modal-2" hide-footer>
            <!-- <p class="my-4">Hello from modal!</p> -->
            <div class="row">

                <h4 class="col-12">Вы уверены, что хотите очистить ответы? </h4>
           

                <div class="modal-footer">
                    <button type="button" class="btn btn-success">Да</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal">Нет</button>
                </div>
            </div>
        </b-modal>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            table: {
                id: 1,
            }
        }
    },
    props: [],

    created() {


    },

    computed: mapState({

    }),
    methods: {
        nextPage() {
            window.scrollTo(0, 0)

        },
        previosPage() {

        },
        filterContentFromAPI(routeObject) {

        },
        deleteQuiz(id) {

        }
    }

}
</script>
<style>
    #modal-2 .modal-content button{
width: min-content;
}
</style>
