<template>
    <div>
        <h4 class="mt-4">Вопрос {{question.id}}</h4>
        <h5>Введите вопрос</h5>
        
        <p ><b></b></p>
        <input type="text" class="w-75">
        <button class="button_delete_quest rounded-circle  btn-danger"  >X</button>

        <input type="file">
        <div class="col-9 col-sm-12 mt-4">
        <select class=" " name="" id="1" @change="updateTypeQuestion($event.target)">
            <option value="" selected disabled>Выбор формата ответа из списка</option>
            <option value="text">Произвольный текст</option>
            <option value="one">Один из списка</option>
            <option value="many">Несколько из списка</option>
            <option value="checkbox">Чек-бокс</option>
            <option value="rate">Вопрос со ставкой</option>
        </select>
    </div>
        <div v-if="type == 'text'"   >
            <TypeText :question="question"></TypeText>
        </div>
        <div v-if="type == 'one'" >
            <TypeOne :question="question"></TypeOne>
        </div>
        <div v-if="type == 'many'" >
            <TypeMany :question="question"></TypeMany>
        </div>
        <div v-if="type == 'checkbox'" >
            <TypeCheckbox :question="question"></TypeCheckbox>
        </div>
        <div v-if="type == 'rate'" >
            <TypeRate :question="question"></TypeRate>
        </div>

    </div>
</template>
<script>
import TypeText  from '@/components/CreateQuiz/TypeQuestions/TypeText.vue'
import TypeOne  from '@/components/CreateQuiz/TypeQuestions/TypeOne.vue'
import TypeMany  from '@/components/CreateQuiz/TypeQuestions/TypeMany.vue'
import TypeCheckbox  from '@/components/CreateQuiz/TypeQuestions/TypeCheckbox.vue'
import TypeRate  from '@/components/CreateQuiz/TypeQuestions/TypeRate.vue'
export default {
    components: {
      TypeText,TypeOne, TypeMany,TypeCheckbox,TypeRate
    },
    methods: {
            updateTypeQuestion(target){
            this.type=target.value
        },
    },
    computed: {

    },
     props:['question'],
    data() {
        return {
            loadingStatus: true,
            type:''
        
        }
    },
    async mounted() {
        this.loadingStatus = false
    }
}
</script>
<style>.button_delete_quest {
    width:30px;
}</style>