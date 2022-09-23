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
            <h1 style="font-size:25px;">Жюри</h1>
        </div>
        <div class="container">
            <div class="row" style="margin-top:5%">
                <p style="margin:0">Полное имя:</p>
                <b-form-input class="input" v-model="data.name" 
                    id="unique"
                    required>
                </b-form-input>
            </div>
            <div class="row" >
                <p style="margin:0">Email:</p>
                <b-form-input class="input" v-model="data.email" type="email"/>
            </div>
            <div class="row" >
                <p style="margin:0">Код подтверждения:</p>
                <b-form-input 
                    class="input" type="number"
                    v-model="data.validation_code"
                    required>
                </b-form-input>
            </div>
            <div class="row justify-content-center" style="margin-top:2%">
                <img v-if="src" :src="src" class="previewImg"/>
            </div>
            <div class="row justify-content-center" style="margin-top:2%">
                <div class="col-lg-4 col-12 col-sm-6">
                    <b-button class="btn-passive" @click="clickFileInput">Загрузить изображение</b-button>
                </div>
            </div>
        </div>
        <div style="margin-top:10%" class="row">
            <div class="col-lg-6 col-sm-4"></div>
            <div class="col-lg-3 col-6 col-sm-4">
                <b-button class="btn" @click="createJudge">
                    <span v-if="!loadingStatus">Сохранить</span> 
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
<input type="file" ref="fileInput" @change="addPortraint" style="display:none" accept="image/* "/>
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    computed:mapState({
    }),
    methods:{
        addPortraint(){
            this.portrait=this.$refs.fileInput.files[0]
            this.src=URL.createObjectURL(this.$refs.fileInput.files[0])
        },
        async createJudge(){
            this.loadingStatus=true
            await this.$store.dispatch('createLpp/createJudge',{portrait:this.portrait,data:this.data})
            .then(()=>{
                this.$emit('close')
            })
            .catch(err=>{
                if (err.response.status===400){
                    let str=''
                    for (let key in err.response.data){
                        str+=err.response.data[key][0]+"\n"
                    }
                    alert(str)
                }
            })
            
            this.loadingStatus=false
        },
        clickFileInput(){
            this.$refs.fileInput.value=null
            this.$refs.fileInput.click()
        },
    },
    data(){
        return{
            loadingStatus:false,
            portrait: '',
            src:'',
            data:{
                name:"",
                email:"",
                validation_code: null,
                round_1_finished: false,
                round_2_finished: false,
                round_3_finished: false,
                is_feedback_sent: false
            }
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
</style>
