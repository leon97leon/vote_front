<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-lg-5  col-11">Журнал ответов участников</h2>
            <div>

                <vue-good-table :columns="columns" @on-row-click="onRowClick" :rows="this.res"  :pagination-options="{
    enabled: true,
    perPageDropdown: [50, 100],
    nextLabel: 'Вперед',
    prevLabel: 'Назад',
    rowsPerPageLabel: 'Показывать по',
    ofLabel: 'из',
  }">

                    <!-- :search-options="{  placeholder: 'Поиск по таблице', enabled: true }" -->
                    <template slot="table-row" scope="props">

                        <span v-if="props.column.field == 'id_part'">
                            <span>
                                {{ props.row.id_part }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'name'">
                            <span>
                                {{ props.row.name }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'email'">
                            <span>
                                {{ props.row.email }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'name_part'">
                            <span>
                                {{ props.row.name_part }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'number_ques'">
                            <span>
                                {{ props.row.number_ques }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'type_ques'">
                            <span>
                                {{ props.row.type_ques }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'body'">
                            <span>
                                {{ props.row.body }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'answer'">
                            <span>
                                {{ props.row.answer }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'true_answer'">
                            <span>
                                {{ props.row.true_answer }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'ball_answer'">
                            <span>
                                {{ props.row.ball_answer }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'price'">
                            <span>
                                {{ props.row.price }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'fine'">
                            <span>
                                {{ props.row.fine }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'ball_all'">
                            <span>
                                {{ props.row.ball_all }}
                            </span>
                        </span>
                        <span v-if="props.column.field == 'coincidence'">
                            <select v-model="props.row.result" name="" id="">
                                <option value="true">Верно</option>
                                <option value="false">Неверно</option>
                            </select>
                        </span>
                        <span v-if="props.column.field == 'worked'">
                            <select v-model="props.row.otrab" @change="changeanswer(props.row)" name="WorkedOut" id="">
                                <option value="true">Да</option>
                                <option value="false">Нет</option>
                            </select>
                        </span>


                    </template>
                </vue-good-table>
            </div>

        </div>
        <!-- <div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner">
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                    label="Spinning"></b-spinner>

            </div>
            <table class="table table-hover" id="AnswerTable"
                style=" vertical-align: middle; min-width: 1600px;background-color: rgba(0, 0, 0, 0)">
                <thead class="table--theader">
                    <tr>
                        <td> ID участника </td>
                        <td> Название опроса</td>

                        <td> Email-участника</td>
                        <td> Наименование раздела</td>

                        <td>Тип вопроса</td>
                        <td> Название вопроса</td>

                        <td>Ответ участника </td>
                        <td>Верный ответ</td>
                        <td>Совпадение (Верно/неверно)</td>
                        <td>Баллы за ответ (0/1)</td>
                        <td>Балл-ставка участника</td>
                        <td>Итоговое кол-во баллов за вопрос</td>
                        <td>Вопрос отработан (Да/Нет)</td>

                    </tr>
                </thead>

                <tbody>
                    <tr v-for="(item,index) in this.res">
                        <td>{{item.id_part}}</td>
                        <td>{{item.name}}</td>
                        <td>{{item.email}}</td>
                        <td>{{item.name_part}}</td>
                        <td>{{item.type_ques}}</td>
                        <td>{{item.body}}</td>
                        <td>{{item.answer}}</td>
                        <td>{{item.true_answer}}</td>
                        <td><select v-model="item.result" name="" id="">
                                <option value="true">Верно</option>
                                <option value="false">Неверно</option>
                            </select>
                        </td>

                        <td>{{item.ball_answer}}</td>
                        <td>{{item.price}}</td>
                        <td>{{item.ball_all}}</td>
                        <td :class="{selects: item.otrab == true}"><select v-model="item.otrab"
                                @change="changeanswer(item)" name="WorkedOut" id="">
                                <option value="true">Да</option>
                                <option value="false">Нет</option>
                            </select>

                        </td>
                    </tr>
                </tbody>
            </table>

        </div> -->
    </div>
</template>
<script>
import 'vue-good-table/dist/vue-good-table.css'
import { VueGoodTable } from 'vue-good-table';
import { METHODS } from 'http';
import { mapState } from 'vuex';
export default {
    data() {
        return {
            loadingStatus: false, columns: [

                {
                    label: 'ID участника',
                    field: 'id_part', width: '130px',

                },

                {
                    label: 'Название опроса',
                    field: 'name',
                    filterOptions: {
                        enabled: true, placeholder: 'Название'
                    }
                }, {

                    label: 'Email-участника',
                    field: 'email',
                    filterOptions: {
                        enabled: true, placeholder: 'Email'
                    }
                }, {

                    label: 'Наименование раздела',
                    field: 'name_part',
                    filterOptions: {
                        enabled: true, placeholder: 'Наименование'
                    }
                },
                {

                    label: 'Номер вопроса',
                    field: 'number_ques',
                    filterOptions: {
                        enabled: true, placeholder: 'Номер'
                    }
                }, {
                    label: 'Тип вопроса',
                    field: 'type_ques',
                },
                {
                    label: 'Название вопроса',
                    field: 'body', filterOptions: {
                        enabled: true, placeholder: 'Название'
                    }
                },
                {
                    label: 'Верный ответ',
                    field: 'true_answer', width: '130px',


                },

                {
                    label: 'Ответ участника',
                    field: 'answer', width: '130px',
                },
                {
                    label: 'Совпадение (верно/неверно)',
                    field: 'coincidence',
                    width: '180px',
                    sortable: false,

                },
                {
                    label: 'Баллы за ответ (0/1)',
                    field: 'ball_answer', width: '130px',
                    sortable: false,

                },
                {
                    label: 'Балл-ставка участника',
                    field: 'price',

                },
                {
                    label: 'Балл-штраф организатора',
                    field: 'fine',

                },
                {
                    label: 'Итоговое кол-во баллов за вопрос',
                    field: 'ball_all', width: '150px',

                },
                {
                    label: 'Вопрос отработан (да/нет)',
                    field: 'worked',
                    sortable: false, tdClass: this.Selects

                },

            ],

        };
    },
    props: ['id'],
    async mounted() {
        this.$store.dispatch('quiz/answer_svod', { 'id_quiz': this.id })
        document.getElementById('AnswerTable').style.backgroundColor = "";
    },
    computed: mapState({
        res: state => state.quiz.answer_svod.res,
    }),
    activated() {
        this.$store.dispatch('quiz/answer_svod', { 'id_quiz': this.id })
    },
    methods: {
        changeanswer(item) {
            if (item.otrab) {
                this.$store.dispatch('quiz/answer_update', { 'answer': item }).then(this.$store.dispatch('quiz/answer_svod', { 'id_quiz': this.id })).catch(
                    this.$store.dispatch('quiz/answer_svod', { 'id_quiz': this.id })
                )
            }

        },
        Selects(row) {
            if (row.otrab == true) {
                return 'selects'
            }
        }, onRowClick() {
            // var btnContainer = document.getElementById("vgt-table");
            var btnContainer = document.getElementsByTagName("tbody")[0];
            var btns = btnContainer.getElementsByClassName("clickable");
            for (var i = 0; i < btns.length; i++) {
                btns[i].addEventListener("click", function () {
                    var current = document.getElementsByClassName("active");
                    if (current.length > 0) {
                        current[0].className = current[0].className.replace(" active", "");
                    }
                    this.className += " active";
                });
            }
        }
    }, components: {
        VueGoodTable
    }


}

</script>
<style>
.selects {
    background: rgb(151, 251, 151) !important;
}

td {
    width: min-content;
}

td,
th {
    text-align: center !important;
    border: 1px solid black !important;
    ;
}

th {
    color: black !important;
    ;
    background: #ace2c8 !important;
    ;
}

.active {
    border: 5px solid green
}
.footer__navigation__page-btn{
    width: max-content;
}
</style>
