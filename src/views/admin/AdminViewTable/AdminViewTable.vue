    <template>
        <div>
            <div>

                <vue-good-table :line-numbers="true"              :columns="columns" :rows="quiz_all">

                <!-- :search-options="{  placeholder: 'Поиск по таблице', enabled: true }" -->
                    <template slot="table-row" scope="props">

                        <span v-if="props.column.field == 'name'">
                            <router-link tag="a" :to="{name:'QuizNum',params:{'id':props.row.id}}"> {{props.row.name}}</router-link>
                        </span>
                        <span v-if="props.column.field == 'created_at'">
                            <span>{{props.row.created_at}}</span>
                        </span>
                        <span v-if="props.column.field == 'Section'">
                            <router-link tag="a" :to="{name:'SectionEdit',params:{'id':props.row.id}}">Перейти
                            </router-link>
                        </span>
                      
                        <span v-if="props.column.field == 'report'">
                            <router-link tag="a" :to="{name:'Report',params:{'id':props.row.id}}">Перейти</router-link>
                        </span>
                        <span v-if="props.column.field == 'id'">
                            <span>{{props.row.id}}</span>

                        </span>
                        <span v-if="props.column.field == 'created'">
                            <span>{{props.row.created}}</span>

                        </span>
                        <span v-if="props.column.field == 'link'">
                            <a
                                :href="'/UserAuth/' + props.row.id">vote.evaluation-efficiency.ru/UserAuth/{{props.row.id}}</a>
                            <b-button class="btn btn-warning table-button"
                                @click="previosPage('vote.evaluation-efficiency.ru/UserAuth/'+props.row.id)">Поделиться
                            </b-button>
                        </span>

                        <span v-if="props.column.field == 'Created'">
                            <span>{{props.row.created}}</span>

                        </span>
                        <span v-if="props.column.field == 'finish'">
                            <span>{{props.row.finish}}</span>

                        </span>
                        <span v-if="props.column.field == 'Clear_answer'">
                            <b-button class="btn btn-warning table-button" @click="sendInfo(props.row.id)" v-b-modal.modal-2>Очистить</b-button>

                        </span>

                        <span v-if="props.column.field == 'Edit_status'">
                            <b-button class="btn btn-warning table-button" @click="changestatus(props.row.id)">Открыть/
                                Закрыть
                            </b-button>
                        </span>
                        <span v-if="props.column.field == 'Status'">
                            <span v-if="props.row.status">Открыт</span>
                            <span v-else>Закрыт</span>
                        </span>
                        <span v-if="props.column.field == 'Delete_quiz'">
                            <b-button class="btn btn-warning table-button" style="color:red"  @click="sendInfo(props.row.id)" v-b-modal.modal-3>
                                Удалить</b-button>
                        </span>


                    </template>
                </vue-good-table>
            </div>

            <div class="admin-table">
                <div class="admin-table__spinner">
                    <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                    <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                        label="Spinning"></b-spinner>

                </div>
                <!-- <table id="info-table" class="table table-hover  table-striped"
                    style=" vertical-align: middle; min-width: 1800px;">
                    <thead class="table--theader">
                        <tr>
                            <td style="width:2%"> </td>
                            <td style="width:15%"> Название </td>
                            <td style="width:10%"> Дата создания</td>

                            <td style="width:10%"> Статус</td>
                            <td style="width:10%"> ID опроса</td>
                            <td style="width:6%"> Отчет по опросу </td>
                            <td style="width:1%"> Ссылка</td>

                            <td style="width:10%"> Владелец </td>
                            <td style="width:10%"> Кол-во завершенных опросов </td>
                            <td style="width:1%"> Очистить ответы </td>
                            <td style="width:1%"> Управление разделами опроса </td>
                            <td style="width:1%"> Изменить статус опроса </td>
                            <td style="width:1%"> Удаление квиза </td>
                        </tr>
                    </thead>
                    <tbody>
                        <td colspan="15">

                        </td>
                    </tbody>
                    <tbody>
                        <tr v-for="(item,index) in postList_n" :key="item.id">
                            <td>{{index+1}}</td>
                            <td>
                                <router-link tag="a" :to="{name:'QuizNum',params:{'id':item.id}}"> {{item.name}}
                                </router-link>
                            </td>
                            <td>{{item.created_at}}</td>
                            <td v-if="item.status">Открыт</td>
                            <td v-else>Закрыт</td>
                            <td>{{item.id}}</td>
                            <td>
                                <router-link tag="a" :to="{name:'Report',params:{'id':item.id}}">Перейти</router-link>
                            </td>
                            <td><a :href="'/UserAuth/' + item.id">vote.evaluation-efficiency.ru/UserAuth/{{item.id}}</a>
                                <b-button class="btn btn-warning table-button"
                                    @click="previosPage('vote.evaluation-efficiency.ru/UserAuth/'+item.id)">Поделиться
                                </b-button>
                            </td>
                            <td>{{item.created}}</td>
                            <td>{{item.finish}}</td>
                            <td>
                                <b-button class="btn btn-warning table-button" v-b-modal.modal-2>Очистить</b-button>
                            </td>
                            <td>
                                <router-link tag="a" :to="{name:'SectionEdit',params:{'id':item.id}}">Перейти
                                </router-link>
                            </td>
                            <td>
                                <b-button class="btn btn-warning table-button" @click="changestatus(item.id)">Открыть/
                                    Закрыть
                                </b-button>
                            </td>
                            <td>
                                <b-button class="btn btn-warning table-button" style="color:red"
                                    @click="deleteQuiz(item.id)">
                                    Удалить</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table> -->
                <b-modal id="modal-3" hide-footer>
                    <!-- <p class="my-4">Hello from modal!</p> -->
                    <div class="row">

                        <h4 class="col-12">Вы уверены, что хотите удалить опрос? </h4>

                        <div class="modal-footer" >
                           <button type="button" class="btn btn-success" @click="deleteQuiz(selectedid)">Да</button>
                           <button type="button" class="btn btn-danger" @click="cansel">Нет</button>
                        </div>
                    </div>
                </b-modal>
                <!-- <b-modal id="modal-section" hide-footer>
                    <div class="row">

                        <h4 class="col-12">Вы уверены, что хотите удалить опрос? </h4>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-success">Да</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Нет</button>
                        </div>
                    </div>
                </b-modal> -->
                <b-modal id="modal-2" hide-footer>
                    <!-- <p class="my-4">Hello from modal!</p> -->
                    <div class="row">

                        <h4 class="col-12">Вы уверены, что хотите очистить ответы? </h4>

                        <div class="modal-footer" >
                           <button type="button" class="btn btn-success" @click="deleteanswer(selectedid)">Да</button>
                           <button type="button" class="btn btn-danger" @click="cansel">Нет</button>
                        </div>
                    </div>
                </b-modal>
                <!-- <b-modal id="modal-section" hide-footer>
                    <div class="row">

                        <h4 class="col-12">Вы уверены, что хотите очистить ответы? </h4>


                        <div class="modal-footer">
                            <button type="button" class="btn btn-success">Да</button>
                            <button type="button" class="btn btn-danger" data-dismiss="modal">Нет</button>
                        </div>
                    </div>
                </b-modal> -->
            </div>
        </div>

    </template>

    <script>

    import { mapState } from 'vuex';
    import Multiselect from 'vue-multiselect'
    import 'vue-good-table/dist/vue-good-table.css'
    import { VueGoodTable } from 'vue-good-table';

    export default {
        data() {
            return {
                loadingStatus: false, index: 0,
                table: {
                    id: 1,
                },
                // rows:{params: quiz_all,link:'  <router-link tag="a" :to="{name:"QuizNum",params:{"id":item.id}}"> {{item.name}}'}
                columns: [

                    {
                        label: 'Название/редактирование опроса',
                        field: 'name',width:'200px',
                        filterOptions: {
            enabled: true,placeholder:'Название/редактирование опроса'}
                    },

                    {
                        label: 'Дата создания',
                        field: 'created_at',
                        type: 'date',
                        dateInputFormat: 'dd.MM.yyyy',
                        dateOutputFormat: 'dd.MM.yyyy',
                        filterOptions: {
            enabled: true,placeholder:'Дата'}
                    },
                    {
                        label: 'Управление разделами опроса',
                        field: 'Section',
                        sortable: false,

                    },
                    {
                        label: 'Отчет по опросу',
                        field: 'report',
                        sortable: false,width:'110px'
                      

                    },
                    {
                        label: 'ID опроса',
                        field: 'id',
                        filterOptions: {
            enabled: true,placeholder:'ID опроса'},width:'150px'
                    
                    },
                    {
                        label: 'Ссылка',
                        field: 'link',
                        sortable: false,

                    },
                    {
                        label: 'Владелец',
                        field: 'created',
                        filterOptions: {
            enabled: true,placeholder:'Владелец'}
                    },
                    {
                        label: 'Кол-во завершенных опросов',
                        field: 'finish',   filterOptions: {
            enabled: true,placeholder:'Количество'}
                    
                    },
                    {
                        label: 'Очистить ответы',
                        field: 'Clear_answer',
                        sortable: false,

                    },
                    {
                        label: 'Изменить статус опроса',
                        field: 'Edit_status',
                        sortable: false,

                    }, {
                        label: 'Статус',
                        field: 'Status',
                    },

                    {
                        label: 'Удаление опроса',
                        field: 'Delete_quiz',
                        sortable: false,

                    },

                ],
                selectedid: '',
            }

        },
        props: [],

        created() {
        },
        async mounted() {
            this.loadingStatus = true
            await this.$store.dispatch('quiz/quizList')

            //await this.$store.dispatch('lpp/judgesList')
            this.loadingStatus = false
            setInterval(async () => {
                await this.$store.dispatch('quiz/quizList')
            }
                , 4 * 1000)
        },

        computed: mapState({
            quiz_all: state => state.quiz.quiz_all,
            fio: state => state.quiz.fio,

        })
        , components: {
            VueGoodTable
        }
        ,
        methods: {
            sendInfo(item) {
            this.selectedid = item;
        },
        cansel(){this.$bvModal.hide('modal-2');},

            nextPage() {
                window.scrollTo(0, 0)

            },

            deleteanswer(id){
            this.$store.dispatch('quiz/deleteanswer',id)
            this.$bvModal.hide('modal-2');
        },    
        deleteQuiz(id) {
         this.$store.dispatch('quiz/deletequiz', id)
         this.$bvModal.hide('modal-3');},
        previosPage(text) {
            navigator.clipboard.writeText(text).then(function () {
                alert('Ссылка скопирована');
            })
        },
        filterContentFromAPI(routeObject) {

        },
        // async deleteQuiz(id) {
        //     await this.$store.dispatch('quiz/deletequiz', id)
        // },
        async changestatus(id) {
            await this.$store.dispatch('quiz/changestatus', id)
            await this.$store.dispatch('quiz/quizList')

        }
    }}


    </script>
    <style>
    #modal-2 .modal-content button {
        width: min-content;

    }

    td,
    th {
        text-align: center !important;
        border: 1px solid black !important;;

    }

    th {
        color: black !important;
        ;
        background: #ace2c8 !important;
        ;
    }
    </style>

