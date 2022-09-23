<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-2">Сводка</h2>

        </div>
        <div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner">
                <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                    label="Spinning"></b-spinner>

            </div>
            <table class="table table-hover" style=" vertical-align: middle; min-width: 1200px;">
                <thead class="table--theader">
                    <tr>
                        <td> Название опроса </td>
                        <td> Вопрос</td>

                        <td> Дата открытия</td>
                        <td> Дата закрытия</td>

                        <td>Начато опросов</td>
                        <td> Завершено опросов</td>

                        <td>Последняя запись </td>
                        <td>Статус опроса</td>

                    </tr>
                </thead>

                <tbody>
                    <td>"Название"</td>
                    <td><select name="" id="">
                            <option value="">1</option>
                            <option value="">2</option>

                        </select></td>
                    <td>дд.мм.гг</td>
                    <td>дд.мм.гг</td>
                    
                    <td>6</td>
                    <td>6</td>
                    <td>чч.мм дд.мм.гг</td>
                    <td>закрыт</td>
                    
                </tbody>
            </table>


        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {

        };
    },
    props: [],

}
</script>
