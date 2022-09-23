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
            <h1 style="font-size:25px;">Список раундов</h1>
        </div>

        <div style="overflow-y:scroll; max-height:200px; overflow-x:hidden; padding:1%">
            <div v-for="item of roundList" style="margin-bottom:1%" :key="item.id">
                
                <CreateRound :roundId="item.id"/>

            </div>
        </div>

        <div style="margin-top:2%" class="row">
            <div class="col-8"></div>
            <div class="col-4">
                <b-button class="btn" @click="editRounds">
                    <b-spinner v-if="loadingStatus" variant="light" small ></b-spinner>
                    <span v-else>Ok</span>
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
import CreateRound from '@/components/CreateLpp/CreateRound.vue'
import { mapState } from 'vuex'
export default {
    components:{
        CreateRound,
    },
    computed:mapState({
        roundList: state => state.createLpp.roundList,
    }),
    methods:{
        async editRounds(){
            this.loadingStatus=true
            await this.$store.dispatch('createLpp/editRounds')
            this.loadingStatus=false
            this.$emit('close')
        }
    },
    data(){
        return{
            showModal:false,
            loadingStatus:false,
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
