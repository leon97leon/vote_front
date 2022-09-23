<template>
    <div class="row">
        <div>
            <h5 class="mt-3">Правильный ответ</h5>
            <input type="text" class="w-75" style="background:#a3e9a3;">

        </div>
        <RequiredQuestion></RequiredQuestion>
    </div>
</template>
<script>
import RequiredQuestion  from '@/components/CreateQuiz/TypeQuestions/RequiredQuestion.vue'
export default {
    components: {
        RequiredQuestion
    },
    methods: {
       
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