<template>
    <div class="container">
        <div class="row justify-content-center">
            <h2 class="col-md-3 col-8">Отчет "Вопрос"</h2>

        </div>
        <div>
<h3>Название опроса</h3>
<h6>КВИЗ СВА</h6>
<h3>Вопрос 1</h3>
<h6>Текст вопроса</h6>
<div class="row justify-content-start">
    <h6 class="col-2" style="width:min-content">Ответили:</h6>
    <h6 class="col-1">5 10%</h6>

</div>
<div class="row justify-content-start">
    <h6 class="col-2" style="width:min-content">Пропустили:</h6>
    <h6 class="col-1">5 10%</h6>

</div>

<h3>Ответы</h3>
<div class="admin-table" style="overflow-x:auto">
            <div class="admin-table__spinner">
                <!-- <p v-if="loadingStatus" >Загружаем</p> -->
                <b-spinner v-if="loadingStatus" style="margin-left:10px;" variant="success" small type="grow"
                    label="Spinning"></b-spinner>

            </div>
            <div class="row justify-content-start justify-content-md-center">

                <table class="table table-hover " style=" vertical-align: middle; min-width: 500px; max-width: 1000px;">
                    <thead class="table--theader">
                        <tr>
                            <td></td>
                            <td style="width:140px"> Кол-во голосов </td>
                            <td  style="width:120px"> Процент</td>
                            
                            
                        </tr>
                    </thead>

                    <tbody>
                        <td>Вариант ответа 1</td>
                        <td>99</td>
                        <td>99</td>
                        
                </tbody>
                <tbody>
                    <td>Вариант ответа 1</td>
                    <td>99</td>
                    <td>99</td>
                    
                </tbody>
            </table>
        </div>
            
        </div>
    </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            table: {
                id: 1,
            }
        };
    },
    props: [],

}
</script>
