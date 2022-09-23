<template>
    <div class="row mt-3">
        <div>
            <h5>Варианты ответа</h5>
            <AnswTypeMany :choices="choice" :question=question v-for="choice in question.choices" :key="choice.id">
            </AnswTypeMany>
            <b-button class="w-50 mt-3" @click="createChoiсes()">Добавить вариант</b-button>
            <!-- <p>Правильный ответ</p>
            <input type="text"> -->

        </div>
        <RequiredQuestion></RequiredQuestion>
    </div>
</template>

<script>
import RequiredQuestion from '@/components/CreateQuiz/TypeQuestions/RequiredQuestion.vue'
import AnswTypeMany from './AnswTypeMany.vue';
export default {
        props: ['question','choices'],
data(){ return {
           
           type: '', id_answer: 1

       }
},
    components: { AnswTypeMany, RequiredQuestion },methods: {
        createChoiсes() {
            console.log(this.question)
            let id = this.id_answer;
            // , choices:[{id:1}]
            this.question.choices.push({ id: id, is_true: false })
            // this.question.push({choices:[{id: id, is_true:false}]})
            console.log(this.question.choices)
            this.id_answer++;
        },
 watch:{
        id_q(){
            for(let option of this.question.choices){
                console.log(option)
                if(option.id==this.id_q){
                    option.is_true=true;
                    console.log(option.id)
                }else{
                    option.is_true=false;
                }
            }
            
            // console.log(this.question.choices[this.id_q-1])
        }
    },
    }
}
</script>

<style>
</style>