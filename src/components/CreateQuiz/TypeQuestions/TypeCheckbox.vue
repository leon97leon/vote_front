<template>
    <div class="row mt-3">
        <div class="col">
            <h6>Строчки</h6>
            <AnswTypeCheckbox class=" w-100 m-0" :choices="choice" :question=question v-for="choice in question.choices"
                :key="choice.id">
            </AnswTypeCheckbox>
            <b-button class="w-100" @click="createChoiсes()">Добавить строчку</b-button>


        </div>
        <div class="col">
            <h6>Столбцы</h6>
            <AnswTypeCheckbox class=" w-100 m-0" :choices="choice" :question=question v-for="choice in question.choices" :key="choice.id">
            </AnswTypeCheckbox>
            <b-button class="w-100" @click="createChoiсes()">Добавить столбец</b-button>
            <!-- <p>Правильный ответ</p> -->
            <!-- <input type="text"> -->

        </div>
        <div class="row">
        <div>
            <h5 class="mt-3">Правильный ответ</h5>
            <input type="text" class="w-75" style="background:#a3e9a3;">

        </div>
        </div>
        <RequiredQuestion></RequiredQuestion>
    </div>
</template>
<script>
import RequiredQuestion from '@/components/CreateQuiz/TypeQuestions/RequiredQuestion.vue'
import AnswTypeCheckbox from '@/components/CreateQuiz/TypeQuestions/AnswTypeCheckbox.vue'
export default {
    props: ['question', 'choices'],
    components: {
        RequiredQuestion, AnswTypeCheckbox
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