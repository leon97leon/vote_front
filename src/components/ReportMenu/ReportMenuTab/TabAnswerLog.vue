<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-lg-5  col-11">Журнал ответов участников</h2>

        </div>
        <div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner">
                <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                    label="Spinning"></b-spinner>

            </div>
            <table class="table table-hover" style=" vertical-align: middle; min-width: 1600px;">
                <thead class="table--theader">
                    <tr>
                        <td > ID участника </td>
                        <td> Название опроса</td>

                        <td> Название команды</td>
                        <td> Наименование раздела</td>

                        <td>Тип вопроса</td>
                        <td> Название вопроса</td>

                        <td>Ответ участника </td>
                        <td>Верный ответ</td>
                        <td>Совпадение (Верно/неверно)</td>
                        <td>Баллы за ответ (0/1)</td>
                        <td>Балл-ставка участника</td>
                        <td>Итоговое кол-во баллов за вопрос</td>
                        <td>Вопрос отработан (Да/Нет)</td>

                    </tr>
                </thead>

                <tbody>
                    <td>99</td>
                    <td>Квиз СВА</td>
                    <td>Супер-пупер</td>
                    <td>Раунд 1</td>
                    <td>Произвольный текст</td>
                    <td>Назовите день России</td>
                    <td>15 июня</td>
                    <td>12 июня</td>
                    <td><select name="" id="">
                            <option value="">Верно</option>
                            <option value="">Неверно</option>
                        </select>
                    </td>

                    <td>0</td>
                    <td></td>
                    <td></td>
                    <td :class="{selects: selectedDay == 1}"><select v-model="selectedDay" name="WorkedOut" id="">
                            <option value="1">Да</option>
                            <option value="2">Нет</option>
                        </select>

                    </td>
                </tbody>
            </table>

        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            selectedDay: 1
        }

    },
    props: []
}


</script>
<style>
.selects {
    background: rgb(151, 251, 151);
}
td{
    width: min-content;
}
</style>
