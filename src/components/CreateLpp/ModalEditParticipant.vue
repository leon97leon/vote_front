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
            <h1 style="font-size:25px;">Участник</h1>
        </div>
        <div v-if="loadingStatus" class="text-center">
            <Loader/>
        </div>
        <div class="container" v-else>
            <div class="row" style="margin-top:2%">
                <b-form-input 
                    class="input" type="number"
                    placeholder="Табельный номер" 
                    v-model="data.personnel_number"
                />
            </div>
            <div class="row" style="margin-top:2%">
                <b-form-input class="input" v-model="data.name" 
                    placeholder="Полное имя"
                    id="unique"
                    required>
                </b-form-input>
            </div>
            
            <div class="row">
                <p style="margin:0">ТБ/ЦА:</p>
                <select class="authorization__select select" v-model="data.tb">
                <option v-for="item in tb" :key="item.id" :value="item.id">{{item.full_name}}</option>
                </select>
            </div>
            <div class="row">
                <p style="margin:0">Отдел:</p>
                <select class="authorization__select select" v-model="data.department">
                    <option v-for="item in departments" :key="item.id" :value="item.id">{{item.short_name}}</option>
                </select>
            </div>
            <div class="row">
                <p style="margin:0">Должность:</p>
                <select class="authorization__select select" v-model="data.position">
                    <option v-for="item in positions" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
            </div>

            <div class="row justify-content-center" style="margin-top:1%">
                <img v-if="src" :src="src" class="previewImg"/>
            </div>
            <div class="row justify-content-center" style="margin-top:1%">
                <div class="col-lg-4 col-12 col-sm-6">
                    <b-button class="btn-passive" @click="clickFileInput">Загрузить изображение</b-button>
                </div>
            </div>
        </div>
        <div style="margin-top:2%" class="row">
            <div class="col-lg-6 col-sm-4"></div>
            <div class="col-lg-3 col-6 col-sm-4">
                <b-button class="btn" @click="edit">
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
import Loader from '@/components/Loader'
export default {
    components:{
        Loader,
    },
    methods:{
        addPortraint(){
            this.portrait=this.$refs.fileInput.files[0]
            this.src=URL.createObjectURL(this.$refs.fileInput.files[0])
        },
        async edit(){
            this.loadingStatus=true
            await this.$store.dispatch('createLpp/editParticipant',{portrait:this.portrait,data:this.data})
            .then(async ()=>{
                await this.$store.dispatch('createLpp/participantList')
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
    props:[
        'participantId'
    ],
    beforeMount(){
        this.data=this.$store.getters['createLpp/getParticipantById'](this.participantId)
    },
    data(){
        return{
            loadingStatus:false,
            portrait: '',
            src:'',
            data:null,
        }
    },
    async mounted(){
        this.loadingStatus=true
        await this.$store.dispatch('admin/getBankInfo')
        this.loadingStatus=false
    },
    computed:mapState ({
        departments: state => state.admin.departments,
        positions: state => state.admin.positions,
        tb: state => state.admin.tb,
    }),
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
        border:2px solid rgb(50,200,50)
    }
    .select{
        border:2px solid rgb(50,200,50);
        border-radius:3px
    }
</style>
