<template>
    <div class="row">

        <b-form-group>
        </b-form-group>
        <b-form-checkbox @change="setRightAnswer()" style="width:max-content" :checked="varible==choices.id" :name="'Questions'.concat(question.id)" :value="choices.id"
            v-model="varible" plain > 
            <!-- {{name}} -->
            <b-form-input v-model="choices.choice" style="width:100%;" placeholder="">
            </b-form-input>
        </b-form-checkbox>
        <button class="button_delete rounded-circle  btn-danger" v-on:click="deleteChoice(choices.id,question.choices)">X</button>
    </div>
</template>

<script>
export default {
    props: ['choices', 'question'],
    data() {
        return {
            varible: 0,
            position: [],
            rightAnswer: false,
            selected: document.getElementsByName('some-radios'),
        }
    },

    mounted(){
        if (this.choices.is_true){
            this.varible = this.choices.id

    }
    console.log(this.varible)    
    },
        
    methods: {
        // id set
        added() {
        },
        setRightAnswer() {
            // this.varible=choices.id
            this.$parent.id_q = this.varible
            this.choices.is_true=true
        
        }, deleteChoice(id,choice) {
            let index = id
            // console.log(this.question.choices)
            this.question.choices = this.question.choices.filter(item => item.id !== index)
        }
    }
}
</script>

<style>
</style>