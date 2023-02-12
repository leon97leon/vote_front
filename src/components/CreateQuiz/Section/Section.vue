<template>
    <div class="col-12 mt-4">
        <div class="ques" >
            <b-button style="background-color:rgb(77 201 77);font-size: 15px;width: 36px;height: 31px;" @click="show = !show" class="col-1" v-b-toggle="'id-'+part.id" >{{ btnText }}

            </b-button>

        <input class="w-75" style=""  placeholder="Введите название раздела" v-model="part.name" type="text">
        <button class="button_delete rounded-circle  btn-danger" style="width:35px" v-on:click="deletePart(part.id)">X</button>
    </div>
        <div v-if="show" :id="'id-'+part.id">
        <Questions v-for="ques in part.question" :key="ques.id" :question="ques" :part_one="part" ></Questions>
        <b-button variant="success col-md-6 col-12" class="mt-3" @click="createQuestion()">+ Добавить вопрос</b-button>
    </div> 
    </div> 
</template>
<script>

    import Questions from '@/components/CreateQuiz/Questions.vue'
    export default {
        components: {
            Questions
        },
        props:['part','quiz_all'],
        data() {
            return {
                loadingStatus: true,
                type:'',show:true
            
            }
        },
        async mounted() {
            this.loadingStatus = false
        },
        methods: {
                updateTypeQuestion(target){
                this.type=target.value
            },
            createQuestion() {
            let id = this.part.id_question;
            // , choices:[{id:1}]
            this.part.question.push({ id_q: id, choices: [] })
            this.part.id_question++;

        },
        deletePart(index){
            this.quiz_all.part = this.quiz_all.part.filter(item => item.id !== index)
            this.quiz_all.id_part--;
            this.quiz_all.part.forEach(item => {
                if (item.id > index)
                {
                    item.id--;
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
    }

        
    }
</script>
<style>
.ques *{
vertical-align: middle;
}</style>