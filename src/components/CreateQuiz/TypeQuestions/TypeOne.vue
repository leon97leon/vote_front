<template>
    <div class="row mt-3">
        <div>

            <p>Варианты ответа</p>
            <AnswTypeOne :choices="choice" :question=question v-for="choice in question.choices" :key="choice.id">
            </AnswTypeOne>
            <b-button class="w-50 mt-2" @click="createChoiсes()">Добавить вариант</b-button>
            <!-- <p>Правильный ответ</p> -->
            <!-- <input type="text"> -->

        </div>
        <RequiredQuestion></RequiredQuestion>
    </div>
</template>
<script>
import RequiredQuestion from '@/components/CreateQuiz/TypeQuestions/RequiredQuestion.vue'
import AnswTypeOne from '@/components/CreateQuiz/TypeQuestions/AnswTypeOne.vue'
export default {
    props: ['question','choices'],
    components: {
        RequiredQuestion, AnswTypeOne
    },
    computed: {

    },
    data() {
        return {
           
            type: '', id_answer: 1

        }
    },
    methods: {
        createChoiсes() {
            console.log(this.question)
            let id = this.id_answer;
            // , choices:[{id:1}]
            this.question.choices.push({ id: id, is_true: false })
            // this.question.push({choices:[{id: id, is_true:false}]})
            console.log(this.question.choices)
            this.id_answer++;
        }

    },
}
</script>