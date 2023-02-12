<template>
      <b-modal id="modal-1" hide-footer>
        <!-- <p class="my-4">Hello from modal!</p> -->
        <div class="row">

            <h6 class="col-9">Настройка персонализации участников </h6>
            <div class="row col-3">
                <select class=" " name="" id="1" v-model="auth" @change="Auth($event.target)">
                    <option value=false>Нет </option>
                    <option value=true>Да </option>

                </select>

               
            </div>
            <div v-if="this.auth == 'true' || this.quiz.authorization_needed==true" class="checkbox_auth">
                <b-form-checkbox size="lg" v-model="field.familia">Фамилия</b-form-checkbox>
                <b-form-checkbox size="lg" v-model="field.tb">ТБ</b-form-checkbox>
                <b-form-checkbox size="lg" v-model="field.otdel">Отдел/вертикаль</b-form-checkbox>
                <b-form-checkbox disabled size="lg" v-model="field.name">Имя/Название команды</b-form-checkbox>
                <b-form-checkbox size="lg" v-model="field.post">Должность</b-form-checkbox>
                <b-form-checkbox disabled v-model="field.email" size="lg">Личный п/я</b-form-checkbox>
                <b-form-checkbox disabled v-model="field.pin" class="d-flex align-items-baseline" size="lg">Сгенирировать ПИН+ при этом запрашивается эл. почта
                        как LOGIN участника опроса</b-form-checkbox>
              

            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="SaveField">Сохранить</button>
            <button type="button" class="btn btn-secondary" @click="Close" data-dismiss="modal">Отмена</button>
        </div>
    </b-modal>
</template>
<script>
export default {
    data() {
        return { auth: '' }
    }, 
    props:['field','quiz'],
    methods: {
        Auth(target) {
            this.auth = target.value
            console.log(this.field)
            
            
        },
        SaveField(){
            this.quiz.authorization_needed = this.auth;
            this.$bvModal.hide('modal-1');
            
        },
        Close(){
            this.$bvModal.hide('modal-1');
        }
    },
    created(){
        if(this.quiz.id)
        {
            this.auth=this.quiz.authorization_needed
        }
    }

}
</script>
<style>
.modal-content button {
    width: min-content;
}

</style>