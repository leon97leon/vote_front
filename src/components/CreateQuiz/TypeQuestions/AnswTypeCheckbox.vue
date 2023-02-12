<template>
<div class=" row w-50">

   
    <b-form-radio style="width:230px"  @change="setRightAnswer()" :name="'Questions'.concat(question.id)" :value="choices.id"
        v-model="varible" plain>
        <!-- {{name}} -->
        <b-form-input v-if="type==1" v-model="choices.choice" style="width:100%;" placeholder="">
        </b-form-input>
        <b-form-input v-else v-model="choices.choice2" style="width:100%;" placeholder="">
        </b-form-input>
       

    </b-form-radio>
    <button class="button_delete rounded-circle  btn-danger" v-on:click="deleteChoice(choices.id,question.choices)">X</button>
</div>

</template>
<script>
export default {
    props: ['choices', 'question','type'],
    data() {
        return {
            varible: 0,
            position: [],
            rightAnswer: false,
            selected: document.getElementsByName('some-radios'),
        }
    },

    watch: {
        selected() {
            let btn = document.getElementsByName('some-radios') == true
            btn.checked = true;
            btn.checked = false;
            // if(document.getElementsByName('some-radios')==true){

            // }
        }
    },
    methods: {
        // id set
        added() {
        },
        setRightAnswer() {
            // this.varible=choices.id
            this.$parent.id_q = this.varible

        }, deleteChoice(id,choice) {
            let index = id
            // console.log(this.question.choices)
            this.question.choices = this.question.choices.filter(item => item.id !== index)
        }
    }

}
</script>
<style>
.button_delete {
    width: min-content;
}
</style>