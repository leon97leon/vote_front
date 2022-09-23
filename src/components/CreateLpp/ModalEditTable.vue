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
            <h1 style="font-size:25px;">Редактирование стола {{ tableId }}</h1>
        </div>

        <div class="row">
            <p style="font-size:18px; font-weight:500">Список участников</p>
        </div>
        <div style="overflow-y:scroll; max-height:200px; overflow-x:hidden; padding:1%">
            
            <div class="row" v-if="!tableParticipant.length">
                <p style="text-align:center" >Нет участников</p>
            </div>
            <div v-else v-for="item of tableParticipant" class="row" :key="item.id">
                <div class="col-lg-9 col-sm-8 col-md-9 col-8">
                    <p style="font-weight:400; font-size:18px">{{item.name}}, {{getTb(item.tb)}}</p>
                </div>
                <div class="col-lg-3 col-sm-4 col-md-3 col-4">
                    <b-button  @click="cancelParticipant(item.id)" size="sm" class="btn-passive">Отмена</b-button>
                </div>
            </div>
            <hr style="color:green">
            <div class="row" v-if="!participantWithoutTable.length">
                <p style="text-align:center" >Нет участников</p>
            </div>
            <div v-else v-for="item of participantWithoutTable" class="row" :key="item.id">
                <div class="col-lg-9 col-sm-8 col-md-9 col-8">
                    <p style="font-weight:400; font-size:18px">{{item.name}}, {{getTb(item.tb)}}</p>
                </div>
                <div class="col-lg-3 col-sm-4 col-md-3 col-4">
                    <b-button  @click="addParticipant(item.id)" size="sm" class="btn">Добавить</b-button>
                </div>
            </div>
        </div>

        <div style="margin-top:10%" class="row">
            <div class="col-lg-6 col-sm-4"></div>
            <div class="col-lg-3 col-6 col-sm-4">
                <b-button class="btn" @click="editTable">
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
</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    props:[
        'tableId'
    ],
    methods:{
        cancelParticipant(id){
            
            let ind = this.tableParticipant.findIndex(el => el.id===id)
            if (ind!==-1 && this.tableParticipant.length>1) {
                this.participantWithoutTable.push(this.tableParticipant[ind])
                this.tableParticipant.splice(ind,1)
            }

        },
        addParticipant(id){
            let ind = this.participantWithoutTable.findIndex(el => el.id===id)
            if (ind!==-1) {
                this.tableParticipant.push(this.participantWithoutTable[ind])
                this.participantWithoutTable.splice(ind,1)
            }
        },
        getTb(id){
        let ind = this.tb.findIndex(el => id===el.id)
        return this.tb[ind].full_name
        },
        async editTable(){
        await this.$store.dispatch('createLpp/editTable',{table_id:this.tableId, participant:this.tableParticipant.map(el=>el.id)})
        this.$emit('close')
        }
    },
    beforeMount(){
        this.participantWithoutTable=[].concat(this.$store.getters['createLpp/participantWithoutTable'])
        this.tableParticipant=[].concat(this.$store.getters['createLpp/tableParticipant'](this.tableId))
    },
    computed:{
        ...mapState ({
            tb: state => state.admin.tb,
        }),
    },
    data(){
        return{
            loadingStatus:false,
            participantWithoutTable:null,
            tableParticipant:null,
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
