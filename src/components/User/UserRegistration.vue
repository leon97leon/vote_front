<template>
    <div class="container">

        <div class="row justify-content-center" style="overflow:hidden;">

            <div class="registration__admin col-12 col-md-5 mt-5 ">
                <div class="row justify-content-center">
                    <h1 class="col-11 text-center">Регистрация</h1>

                </div>
                <div v-if="loadingStatus" class="text-center">
                    <Loader />
                </div>
                <div v-else>
                    <div v-if="quiz_field.authorization_field.familia">
                        <h5>Фамилия:</h5>
                        <input class="authorization__input" v-model="user.familia" type="text">
                    </div>
                    <div v-if="quiz_field.authorization_field.name">
                        <h5>Имя/Команды:</h5>
                        <input class="authorization__input" v-model="user.name" type="text">
                    </div>
                    <div v-if="quiz_field.authorization_field.email">
                        <h5>Эл. почта:</h5>
                        <input class="authorization__input" v-model="user.email" type="text">
                    </div>
                    <div v-if="quiz_field.authorization_field.tb">
                        <h5>ТБ/ЦА:</h5>
                        <select class="authorization__select" v-model="user.tb">
                            <option v-for="item in tb" :key="item.id" :value="item.name">{{item.full_name}}</option>

                        </select>
                    </div>
                    <div v-if="quiz_field.authorization_field.otdel">
                        <h5>Отдел:</h5>
                        <select class="authorization__select" v-model="user.department">
                            <option v-for="item in departments" :key="item.id" :value="item.name">{{item.short_name}}
                            </option>
                        </select>
                    </div>
                    <div v-if="quiz_field.authorization_field.post">
                        <h5>Должность:</h5>
                        <select class="authorization__select col-12" v-model="user.position">
                            <option style="overflow: hidden;" v-for="item in positions" :key="item.id" :value="item.name">
                                {{item.name}}</option>
                        </select>


                    </div>
                    
                    <div style="margin-top:5%">
                        <button @click="reg">
                            <span v-if="!loadingStatus" >Завершить регистрацию</span>
                            <b-spinner v-else variant="light" small></b-spinner>
                        </button>
                    </div>
                    
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Loader from '@/components/Loader'
import { faPersonThroughWindow } from '@fortawesome/free-solid-svg-icons';
export default {
    components: {
        Loader
    },
    props:['id'],
    data() {
        return {
            loadingStatus: false,
            user: {

                email: '',
                pin: null,
                familia:'',
                name:'',
                tb:'',
                position:'',
                department:'',
                quiz:null,

            },
        }
    },
    async mounted() {
        this.loadingStatus = true
        await this.$store.dispatch('admin/getBankInfo')
        await this.$store.dispatch('quiz/quiz_field', {'id_quiz':this.id})
        
        this.loadingStatus = false
    },
    computed: mapState({
        departments: state => state.admin.departments,
        positions: state => state.admin.positions,
        tb: state => state.admin.tb,
        quiz_field: state => state.quiz.quiz_field,
    }),
    methods: {
        async reg(){
            this.user.pin=this.quiz_field.pin
            this.user.quiz=parseInt(this.id)
            console.log(this.user)
            await this.$store.dispatch('quiz/regPart', this.user)
        }

    }
}
</script>