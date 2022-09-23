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
            <h1 style="font-size:25px;">Список пользователей</h1>
        </div>

        <div style="overflow-y:scroll; max-height:200px; overflow-x:hidden; padding:1%">
            <div v-for="item of participantList" class="row" :key="item.id" style="margin-bottom:1%">
                <div class="col-lg-8 col-sm-6 col-md-8 col-6">
                    <p style="font-weight:400; font-size:18px">{{item.name}}</p>
                </div>
                <div class="col-lg-3 col-sm-4 col-md-3 col-4">
                    <b-button  @click="showEdit(item.id)" size="sm" class="btn">Редактировать</b-button>
                </div>
                <div class="col-lg-1 col-sm-2 col-md-1 col-2">
                    <b-spinner v-if="loadingStatus" variant="dark" style="margin-top:11px" small ></b-spinner>
                    <img v-else style="margin-top:6.5px" class="img" @click="deleteParticipant(item.id)" src="@/assets/times.png"/>
                </div>
            </div>
        </div>
        <div class="row justify-content-center" style="margin-top:2%">
            <div class="col-lg-4 col-12 col-sm-6">
                <b-button class="btn-passive" @click="showModal = true" :disabled="loadingStatus">Добавить участника</b-button>
            </div>
        </div>

        <div style="margin-top:2%" class="row">
            <div class="col-8"></div>
            <div class="col-4">
                <b-button class="btn" @click="$emit('close')">Ok</b-button>
            </div>
        </div>
        
    </slot>
    </div>
    </div>
    </div>
</transition>
<ModalCreateParticipant v-if="showModal" @close="showModal = false"/>
<ModalEditParticipant :participantId="participantId" v-if="showModalEdit" @close="showModalEdit = false"/>
</div>
</template>
<script>
import ModalCreateParticipant  from '@/components/CreateLpp/ModalCreateParticipant.vue'
import ModalEditParticipant  from '@/components/CreateLpp/ModalEditParticipant.vue'
import { mapState } from 'vuex'
export default {
    components:{
        ModalCreateParticipant,
        ModalEditParticipant,
    },
    computed:mapState({
        participantList: state => state.createLpp.participantList,
    }),
    methods:{
        async deleteParticipant(participantID){
                this.loadingStatus=true
                await this.$store.dispatch('createLpp/deleteParticipant',participantID)
                this.loadingStatus=false
        },
        showEdit(participantId){
            this.participantId=participantId
            this.showModalEdit=true
        }
    },
    data(){
        return{
            showModal:false,
            loadingStatus:false,
            participantId:null,
            showModalEdit:false,
        }
    }
}
</script>
<style scoped lang="scss">
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
    }
    .btn-passive:hover{
        background:#d6d6d6;
    }
</style>
