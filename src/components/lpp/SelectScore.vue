<template>
<div>
    <div class="authorization__wrapper" >
        <label for="selectScore" style="text-align:left">{{title}}</label>
        <select ref="select" :class="[ {selected:isSelected}, {nonselected:!isSelected}, {scoreSelect:true} ]" 
            id="selectScore" 
            @change="updateSelectedUser($event.target.value)" 
            :disabled="disabled"
        >
            <option disabled selected value=""></option>
            <option
                v-for="el in scoreArr"
                :key="el"
                :value="el"
            >
                {{el}}
            </option>
        </select>
    </div>
</div>
</template>

<script>

export default {
    name: "Select",  
    components:{
    },
    props:[
        'title',
        'score',
        'scoreArr',
        'disabled',
    ],
    methods:{
        updateSelectedUser(value){
            this.isSelected=false
            if (value!==null){
                this.isSelected=true
            }
            this.$emit('update-score',value)
        },
    },
    computed:{
        
    },
    data(){
        return{
            isSelected:false,
        }
    },
    mounted(){
        if (this.score!==null){
            this.$refs.select.value=this.score.toFixed(1)
            this.updateSelectedUser(this.score.toFixed(1))
        }
    }
}
</script>
<style scoped lang="scss">
.scoreSelect{
    text-align:center;
}
.selected{
    background:green; 
    color:white;
}
.nonselected{
    background:white; 
    color:black;
}
option{
    background:white;
    color:black;
}
</style>
