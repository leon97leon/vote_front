<template>
    <div class="container">

        <div class="row justify-content-center" style="overflow:hidden;">

            <div class="registration__admin col-12 col-md-5 mt-5 ">
                <div class="row justify-content-center">
                    <h1 class="col-11 text-center">Выберите опрос</h1>

                </div>
                <div v-if="loadingStatus" class="text-center">
                    <Loader />
                </div>
                <div v-else>
                    <div>
                        <h5>ID:</h5>
                        <input v-model="quiz.id_quiz" class="authorization__input" type="text">
                    </div>
                    
                    <div style="margin-top:3%">
                        <button>
                            <span v-if="!loadingStatus" @click="start">Продолжить</span>
                            <!-- <b-spinner v-else variant="light" small></b-spinner> -->
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
    
    data() {
        return {
            loadingStatus: false,
            quiz:{id_quiz:''}
            

        }
    },
    async mounted() {
        this.loadingStatus = true
        // await this.$store.dispatch('admin/getBankInfo')
        this.loadingStatus = false
    },

    methods: {
        async start(){
            await this.$store.dispatch('quiz/reg_quiz', this.quiz)
        },

    }
}
</script>
<style>.close {
    width: auto;
  }</style>