<template>
    <div class="row">
        <div>
            <h5 class="mt-3">Правильный ответ</h5>
            <input type="text" class="w-75 input_text" v-model="question.choices[0].choice"  :class="{'disable-input': disabled}" :disabled="disabled == true" @change="update" >
        </div>
        <RequiredQuestion></RequiredQuestion>
        <div class="mt-1">

            <input type="checkbox" id="checkbox1" @click="disabled=!disabled" @change="question.choices[0].choice = ''">
            <label for="checkbox1"><h6> Без проверки ответа</h6></label>
        </div>
    </div>
</template>
<script>
import RequiredQuestion  from '@/components/CreateQuiz/TypeQuestions/RequiredQuestion.vue'
export default {
    props: ['question'],
    components: {
        RequiredQuestion
    },
    methods: {
        update() {
            console.log(this.question.choices)
            // this.question.choices.push({ id: 1, is_true: true, })
        }
    },
    computed: {

    },
    data() {
        return {
            loadingStatus: true,
            type: '',
            disabled:false
        }
    },
    async mounted() {
        this.loadingStatus = false
    }
}
</script>
<style>

input.disable-input {
  background-color: gray;
  content: '';
}
.input_text{
    background-color:#a3e9a3;
}
</style>