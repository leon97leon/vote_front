<template>
    <div class="row">
        <div>
            <h5 class="mt-3">Правильный ответ</h5>
            <input type="text" class="w-75" v-model="question.choices[0].choice"  @change="update" style="background:#a3e9a3;">

        </div>
        <RequiredQuestion></RequiredQuestion>
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
            type: ''

        }
    },
    async mounted() {
        this.loadingStatus = false
    }
}
</script>