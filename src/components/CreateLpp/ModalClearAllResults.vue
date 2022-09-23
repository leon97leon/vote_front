<template>
<div>
<transition name="modal" style="display:block; width:100%">
    <div class="modal-mask" >
    <div class="modal-wrapper" >
    <div class="modal-container" style="display:block; width:80%">
    <slot name="body">
        <div style="text-align:right">
            <img class="img" @click="$emit('close')" src="@/assets/green_times.png"/>
        </div>
        <div style="text-align:left; margin-bottom:2%">
            <h1 style="font-size:25px;">Очистить все оценки участников?</h1>
        </div>
        
        <div style="margin-top:10%" class="row">
            <div class="col-lg-6 col-sm-4"></div>
            <div class="col-lg-3 col-6 col-sm-4">
                <b-button class="btn-danger" @click="clearAllResults">
                    <span v-if="!loadingStatus">Да</span> 
                    <b-spinner v-else variant="light" small ></b-spinner>
                </b-button>
            </div>
            <div class="col-lg-3 col-6 col-sm-4">
                <b-button class="btn-passive" @click="$emit('close')">
                    Отмена
                </b-button>
            </div>
        </div>
    </slot>
    </div>
    </div>
    </div>
</transition>
</div>
</template>
<script>
export default {
    methods:{
        async clearAllResults(){
            this.loadingStatus=true
            await this.$store.dispatch('createLpp/clearAllResults')
            .catch(err=>{
                console.log(err.response)
            })
            this.loadingStatus=false
            this.$emit('close')
        },
    },
    data(){
        return{
            loadingStatus:false,
        }
    }
}
</script>
<style scoped lang="scss">
    .previewImg{
        height:100px;
        width:150px;
        margin:2% 0 2% 0;
    }
    .img{
        height:25px;
    }
    .img:hover{
        cursor:pointer;
    }
    .btn{
        margin-top:2%;
        background:rgba(60,120,60,1);
        border: none;
        color:white;
    }
    .btn:hover{
        background:rgba(50,120,50,0.9);
    }
    .btn-passive{
        border-radius:0;
        margin-top:2%;
        background:#e6e6e6;
        border: none;
        color:black;
        height: auto;
    }
    .btn-passive:hover{
        background:#d6d6d6;
    }
    .input{
        border:2px solid rgb(50,200,50);
    }
    .btn-danger{
        border-radius:0;
        background:rgb(200,50,50);
        border: none;
        color:black;
        margin:2%;
    }
    .btn-danger:hover{
        background:rgb(180,30,30);
        color:black;
    }
</style>
