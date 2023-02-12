<template>
    <div class="row">
    
        
            <b-form-radio class="" style="width:max-content" @change="setRightAnswer()" :checked="varible==choices.id"  :name="'Questions'.concat(question.id)" :value="choices.id"
             v-model="varible">
                <b-form-input v-model="choices.choice" style="width:100%;" placeholder="">
                </b-form-input>

            </b-form-radio>
        <button class="button_delete rounded-circle  btn-danger " v-on:click="deleteChoice(choices.id,question.choices)">Х</button>

    </div>
</template>
<script>
export default {
    props: ['choices', 'question','id_answer'],
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
            console.log(this.varible)
            this.$parent.id_q = this.varible
            console.log(this.question.choices)
            this.question.choices.forEach(ch => {
                ch.is_true=false
            });
            this.choices.is_true=true
            

        }, deleteChoice(id,choice) {
            let index = id
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