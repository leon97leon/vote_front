<template>
    <div >
        <div class="d-flex mt-4" >
            
            <b-button  @click="show = !show" class="col-1 btn-primary" style="width:37px;font-size: 12px; height: 24px;background:rgb(10 110 10);margin-right: 10px;" v-b-toggle="'id-'+question.id" variant="primary" >{{ btnText }}
            </b-button>
            <h4 class="">Вопрос {{question.id_q}}</h4>
            
            
        </div>
        <h5>Введите вопрос</h5>
        
        <p ><b></b></p>
        <input type="text" v-model="question.body" class="w-75">
        <button class="button_delete_quest rounded-circle  btn-danger" style="margin-left:10px"  v-on:click="deleteQues(question.id_q)" >X</button>

        <input type="file" ref="file_ques" v-on:change="handleFileUpload()">
        <div v-if="show" :id="'id-'+question.id" >

        <div class="col-9 col-sm-12 mt-4" >
        <select class=" "  name="" id="1" v-model="question.answer_type" @change="updateTypeQuestion($event.target)">
            <option value="" selected disabled>Выбор формата ответа из списка</option>
            <option value="3">Произвольный текст</option>
            <option value="1">Один из списка</option>
            <option value="2">Несколько из списка</option>
            <option value="4">Чек-бокс</option>
            <option value="5">Вопрос со ставкой</option>
            <option value="6">Вопрос со штрафом</option>
        </select>
       

            <select v-if="type == '6' || this.question.answer_type == '6'" style="margin-left:10px" name="" id="" v-model="question.fine">
                <option value="0" selected disabled>Штраф</option>
                <option value="1">-1</option>
                <option value="2">-2</option>
            </select>
    </div>
        <div v-if="type == '3' || this.question.answer_type == '3'"   >
            <TypeText :question="question"></TypeText>
        </div>
        <div v-if="type == '1' || this.question.answer_type == '1'" >
            <TypeOne :question="question"></TypeOne>
        </div>
        <div v-if="type == '2' || this.question.answer_type == '2'" >
            <TypeMany :question="question"></TypeMany>
        </div>
        <div v-if="type == '4' || this.question.answer_type == '4'" >
            <TypeCheckbox :question="question"></TypeCheckbox>
        </div>
        <div v-if="type == '5' || this.question.answer_type == '5'" >
            <TypeRate :question="question"></TypeRate>
        </div>
        <div v-if="type == '6' || this.question.answer_type == '6'" >
            <TypeFine :question="question"></TypeFine>
        </div>

    </div>
    </div>
</template>
<script>
import TypeText  from '@/components/CreateQuiz/TypeQuestions/TypeText.vue'
import TypeOne  from '@/components/CreateQuiz/TypeQuestions/TypeOne.vue'
import TypeMany  from '@/components/CreateQuiz/TypeQuestions/TypeMany.vue'
import TypeCheckbox  from '@/components/CreateQuiz/TypeQuestions/TypeCheckbox.vue'
import TypeRate  from '@/components/CreateQuiz/TypeQuestions/TypeRate.vue'
import TypeFine  from '@/components/CreateQuiz/TypeQuestions/TypeFine.vue'
import { createDecipheriv } from 'crypto'
import { createDeflate } from 'zlib'
export default {
    components: {
      TypeText,TypeOne, TypeMany,TypeCheckbox,TypeRate,TypeFine
    },
    methods: {
            updateTypeQuestion(target){
            this.type=target.value
            this.question.choices=[]
            this.question.answer_type = target.value
            console.log(this.question.answer_type)
            if (["3","5","6"].includes(this.type))
            {
                this.question.choices.push({ id: 1, is_true: true, choice:""})     
            }
        },
        handleFileUpload(){
            this.question.files = this.$refs.file_ques.files[0];
            
        },
        deleteQues(index){
            // let element = this.part_one.question[index-1]
            // this.part_one.question.splice(index-1,1)
            this.part_one.question = this.part_one.question.filter(item => item.id_q !== index)
            this.part_one.id_question--;
            this.part_one.question.forEach(ques => {
                if (ques.id_q > index)
                {
                    ques.id_q--;
                }
                
            });

        },
    },
    computed: {
        btnText: function () {
            if (this.show) {
                return '▲'
            }

            return '▼'
        }
    },

     props:['question','part_one'],
    data() {
        return {
            loadingStatus: true,
            type:'',show:true
        
        }
    },
    
    async mounted() {
        this.loadingStatus = false
        
    },
    created(){
        //this.type = this.question.answer_type
        // #this.question.choices=[]
        // console.log(this.question.answer_type)
        // if ([3,5].includes(this.type))
        // {
        //     this.question.choices.push({ id: 1, is_true: true, choice:""})     
        // }
    }
}
</script>
<style>.button_delete_quest {
    width:35px;
}</style>