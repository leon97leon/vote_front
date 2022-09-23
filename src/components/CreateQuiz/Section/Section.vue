<template>
    <div class="col-12 mt-4">
        <input class="w-75" placeholder="Введите название раздела" type="text">
        <button class="button_delete rounded-circle  btn-danger" style="width:30px" v-on:click="deleteChoice(choices.id,question.choices)">X</button>
    </div>
</template>