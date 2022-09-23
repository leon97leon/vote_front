
<template>
    <div>
        <Navigation />
        <div class="container card" style="padding-top:2%">
            <h1> Создание опроса</h1>
            <div style="text-align:left" class="row">
                
                <div v-if="loadingStatus" class="text-center">
                    <Loader />
                </div>
                <div v-else>
<div class="row justify-content-end ">
    <button class="btn-passive col-lg-3 col-sm-12"  v-b-modal.modal-1> Настройки авторизации</button>
    <SetAuthModal></SetAuthModal>

</div>
               
                <div  class="col-sm-10 col-md-9 col-lg-6 col-xs-12">
                    <h5 class="mt-4">Введите название опроса</h5>
                    <input type="text" class="w-75">
                    <h5 class="mt-4">Загрузите изображение-шапку опроса</h5> {{question}}
                    <input type="file">
                    <b-button class="mt-4" @click="createSection()">+ Добавить раздел</b-button>
                    <Section> </Section>
                    <Questions v-for="item in this.quiz.question" :key="item.id" :question="item"></Questions>
                    <b-button variant="success" class="mt-3" @click="createQuestion()">+ Добавить вопрос</b-button>
                </div>
            </div>
                <div class="container">
                    <div style="margin-top:10%" class="row">
                        <div class="col-lg-6 col-sm-4"></div>
                        <div class="col-lg-3 col-12 col-sm-10 mb-2 mx-auto">
                            <b-button class="btn" @click="">
                                Сохранить
                            </b-button>
                        </div>
                        <div class="col-lg-3 col-12 col-sm-10 mx-auto">
                            <b-button class="btn-passive" @click="goToAdmin">
                                Отмена
                            </b-button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex'
import Navigation from '@/components/Navigation.vue'
import Loader from '@/components/Loader.vue'
import Questions from '@/components/CreateQuiz/Questions.vue'
import Section from '../components/CreateQuiz/Section/Section.vue'
import SetAuthModal from '../components/CreateQuiz/SetAuthModal.vue'

export default {
    components: {
        Navigation, Loader, Questions,Section,SetAuthModal
    },
    data() {
        return {
            loadingStatus: true,
            type: '', quiz: {
                author: [],
                name_quiz: '',
                image: '',
                authorization_needed: false,
                question: [
                    {
                        id: 1,
                        answer_type: '',
                        body: '',
                        choices: [
                            // {
                            //     id:1,
                            //     choice:'',
                            //     position: '',
                            //     is_true: false
                            // }
                        ]

                    }]
            }
            ,


            id_question: 2,

            options: [
                { value: '', text: '' }
            ]
        }
    },
    methods: {
       
        goToAdmin() {
            this.$router.push({ name: 'admin' })
        }, createQuestion() {
            let id = this.id_question;
            // , choices:[{id:1}]
            this.quiz.question.push({ id: id, choices: [] })
            this.id_question++;

        }
    },
    computed: mapState({
        users: state => state.UserData.user
    }),
    async mounted(){
   
        this.loadingStatus=false
    }
}
</script>
<style>
.card {
    background: white;
    padding: 5%;
}

select {
    border: 2px solid rgb(50, 200, 50);
}

.btn {
    background: rgba(60, 120, 60, 1);
    border: none;
    color: white;
}

.btn:hover {
    background: rgba(50, 120, 50, 0.9);
}

.btn-passive {
    border-radius: 0;
    background: #e6e6e6;
    border: none;
    color: black;
}

.btn-passive:hover {
    background: #d6d6d6;
    color: black;
}
</style>