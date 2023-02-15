<template>
    <div class="container">

        <div class="row justify-content-center" style="overflow:hidden;">

            <div class="registration__admin col-12 col-md-5 mt-5 ">
                <div class="row justify-content-center">
                    <h1 class="col-11 text-center">Войти в опрос</h1>

                </div>
                <div v-if="loadingStatus" class="text-center">
                    <Loader />
                </div>
                <div v-else>
                    <div>
                        <h5>Эл. почта</h5>
                        <input class="authorization__input" v-model="email" type="text">
                    </div>
                    <div class="col-md-4 col-5">
                        <h5>ПИН</h5>
                        <input class="authorization__input"  v-model="pin" type="text">
                    </div>
                    <a href = '#' v-b-modal.modal-pin>Забыли ПИН?</a>
                    
                    <div style="margin-top:3%">
                        
                        <button>
                            <span v-if="!loadingStatus" @click="login">Войти</span>
                            <b-modal id="modal-pin" class="mt-0" hide-footer  title="Напоминание ПИН">
                                <div class="row justify-content-center px-3">
        
                                    <div class="">
                                        <h5>Эл. почта</h5>
                                        <input v-model="reset_email" class="col-12" type="text">
                                     </div>
                                    <h6>Укажите вашу почту для направления ПИН</h6>
                                </div>
                                <div class="modal-footer">
                                    <button type="button" class="btn btn-success" @click="resetpin">Отправить</button>
                                </div>
                            </b-modal>
                        </button>
                    </div>
                    <div style="margin-top:3%">
                        <button @click="reg" style="background-color:gray">
                            <span v-if="!loadingStatus">Зарегистрироваться</span>   
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
    export default {
        components: {
            Loader
        },
        props:['id'],
        data() {
            return {
                loadingStatus: false,
                pin: null,
                email: '',
                reset_email:'',
            }
        },
        async mounted() {
            this.$store.commit('quiz/logoutPart')
            this.loadingStatus = true
            this.$store.dispatch('quiz/quiz_field', {'id_quiz':this.id}).then(res=>{
                this.$store.commit('quiz/quiz_field',res.data);
                this.loadingStatus = false
                if (!res.data.authorization_needed)
                {
                    this.$store.dispatch('quiz/regPartAuth', {'id_quiz':this.id})
                    .then(response =>{
                    this.$store.dispatch('quiz/loginPart',{'email':response.data.auth,'pin':'auth',id:this.id})
                    .then(response => {
                    this.$store.commit('quiz/loginPart',response.data.part)
                    this.$router.push('/UserQuiz/'+this.id+'/0')}
                    )
                })
                }
            })
        },
        computed: mapState({
            quiz_field: state => state.quiz.quiz_field,
        }),
        methods: {
            login(){
                this.$store.dispatch('quiz/loginPart',{email:this.email,pin:+this.pin,id:this.id})
                .then(response => {
                this.$store.commit('quiz/loginPart',response.data.part)
                this.$router.push('/UserQuiz/'+this.id+'/0')
                
      }).catch(err=>{alert("Введен некорректный пин или почта!")})
                    },
            reg(){
                this.$router.push('/UserRegistration/'+this.id)
            },
            resetpin(){
                this.$store.dispatch('quiz/resetpin',{email:this.reset_email,quiz:this.id})
                this.$bvModal.hide('modal-pin');
            }
                
                }
    }
</script>
<style>.close {
    width: auto;
  }</style>