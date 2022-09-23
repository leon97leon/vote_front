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
            <h1 style="font-size:25px;">Список столов</h1>
        </div>

        <div style="overflow-y:scroll; max-height:200px; overflow-x:hidden; padding:1%">
        <div v-for="item of tableList" class="row" style="margin-bottom:1%" :key="item.id">
            <div class="col-lg-9 col-sm-8 col-md-9 col-6">
                <p style="font-weight:400; font-size:18px">Стол {{item.table_id}}</p>
            </div>
            <div class="col-lg-3 col-sm-4 col-md-3 col-6">
                <b-button @click="showModal = true; tableId=item.id" size="sm">Редактировать</b-button>
            </div>
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
<ModalEditTable v-if="showModal" :tableId="tableId" @close="showModal = false"/>
</div>
</template>
<script>
import ModalEditTable  from '@/components/CreateLpp/ModalEditTable.vue'
import { mapState } from 'vuex'
export default {
    components:{
        ModalEditTable
    },
    computed:mapState({
        tableList: state => state.createLpp.tableList,
    }),
    async mounted(){
        await this.$store.dispatch('createLpp/participantList')
        await this.$store.dispatch('admin/getBankInfo')
    },
    methods:{

    },
    data(){
        return{
            showModal:false,
            tableId:null,
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
