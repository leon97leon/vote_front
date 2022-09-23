<template>
      <b-modal id="modal-1" hide-footer>
        <!-- <p class="my-4">Hello from modal!</p> -->
        <div class="row">

            <h6 class="col-9">Настройка персонализации участников </h6>
            <div class="row col-3">
                <select class=" " name="" id="1" @change="Auth($event.target)">
                    <option value="no">Нет </option>
                    <option value="yes">Да </option>

                </select>

               
            </div>
            <div v-if="this.auth == 'yes'" class="checkbox_auth">
                <b-form-checkbox size="lg">Фамилия</b-form-checkbox>
                <b-form-checkbox size="lg">ТБ</b-form-checkbox>
                <b-form-checkbox size="lg">Отдел/вертикаль</b-form-checkbox>
                <b-form-checkbox size="lg">Имя/Название команды</b-form-checkbox>
                <b-form-checkbox size="lg">Должность</b-form-checkbox>
                <b-form-checkbox size="lg">Личный п/я</b-form-checkbox>
                <b-form-checkbox class="d-flex align-items-baseline" size="lg">Сгенирировать ПИН+ при этом запрашивается эл. почта
                        как LOGIN участника опроса</b-form-checkbox>
              

            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-primary">Сохранить</button>
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Отмена</button>
        </div>
    </b-modal>
</template>
<script>
export default {
    data() {
        return { auth: '' }
    }, methods: {
        Auth(target) {
            this.auth = target.value
            console.log(this.auth)
        },
    },

}
</script>
<style>
.modal-content button {
    width: min-content;
}

</style>