
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
    <SetAuthModal :field="quiz.authorization_field[0]" :quiz="quiz"></SetAuthModal>

</div>
               
                <div  class="col-sm-10 col-md-9 col-lg-6 col-xs-12">
                    <h5 class="mt-4">Введите название опроса</h5>
                    <input type="text" v-model="quiz.name" class="w-75">
                    <h5 class="mt-4">Загрузите изображение-шапку опроса</h5>
                    <input type="file" ref="file" v-on:change="handleFileUpload()">
                    <b-button style="border-radius: 8px;background:rgb(77 201 77)" class="mt-4" @click="createPart()">+ Добавить раздел</b-button>
                    <Section v-for="item in this.quiz.part" :key="item.id" :part="item" :quiz_all="quiz"></Section>
                    
                    
                </div>
            </div>
                <div class="container">
                    <div style="margin-top:10%" class="row">
                        <div class="col-lg-6 col-sm-4"></div>
                        <div class="col-lg-3 col-12 col-sm-10 mb-2 mx-auto">
                            <b-button class="btn" @click="addQuiz">
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
import Section from '../components/CreateQuiz/Section/Section.vue'
import SetAuthModal from '../components/CreateQuiz/SetAuthModal.vue'

export default {
    components: {
        Navigation, Loader,Section,SetAuthModal
    },
    data() {
        return {
            loadingStatus: true,
            type: '', quiz: {
                name: '',
                authorization_field:[{familia:false,
                                tb :false,
                                otdel:false,
                                name :true,
                                post:false,
                                email:true,
                                pin:true}],
                authorization_needed: false,
                part: [{id:1,
                        name:'',
                        status:true,
                        question: [
                            {
                                id_q: 1,
                                answer_type: 0,
                                body: '',
                                choices: [
                                    // {
                                    //     id:1,
                                    //     choice:'',
                                    //     position: '',
                                    //     is_true: false
                                    // }
                                ]

                            }],
                        id_question:2
                    },],
                
                },
                id_part:2


            
        }
    },
    methods: {
       
        goToAdmin() {
            this.$router.push({ name: 'adminQuiz' })
        }, 
        handleFileUpload(){
            this.file = this.$refs.file.files[0];
            
        },
        createPart() {
            let id = this.id_part;
            // , choices:[{id:1}]
            this.quiz.part.push({ id: id,id_question:2,question: [{id_q:1,choices:[]}]})
            this.id_part++;
        },
        async addQuiz() {
            await this.$store.dispatch('quiz/addQuiz', {avatar:this.file,data:this.quiz}).catch(err => {alert('Заполнены не все поля!')})
            
        },
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