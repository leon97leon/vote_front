<template>
    <div class="container mt-5">
        <div class="row mx-md-5 justify-content-center" style="overflow:auto;">
            <div class="col-12 mb-4 text-center" >
                <h1 class="">Сервис оценки СВА</h1>

            </div>
            <div class="row justify-content-around">
                <div class="col-md-5 col-12  mb-4">
                    <button class="p-3"><router-link tag="a" :to="{name:'login'}"> <h3>Организатор</h3></router-link></button>
                </div>
                <div class="col-md-5 col-12">
                    <button class="p-3"><router-link tag="a" :to="{name:'StartQuiz'}"> <h3>Участник</h3></router-link></button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style >
button{
    height: max-content;
}
</style>