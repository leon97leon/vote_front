<template>
<div>

    <b-spinner v-show="loadingStatus" variant="dark" style="margin-top:11px" small ></b-spinner>

    <div v-show="!loadingStatus" >
        <select class="select" ref="select" @change="addGame">
            <option selected value=""></option>
            <option 
                v-for="item in possibleTables" 
                :key="item.id" 
                :value="item.id"
                :disabled="item.isUsed"
                :class="{selectRed: item.isUsed}"
            >
                Стол {{item.id}}
            </option>
        </select>
    </div>
    
                        
</div>
</template>
<script>

import { mapState } from 'vuex'
export default {
    components:{

    },
    props:[
        'game',
        'judge',
        'round',
    ],
    mounted(){
        if (this.game){
            this.$refs.select.value=this.game.table
        }

    },
    computed:{
        ...mapState({
            tableList: state => state.createLpp.tableList,
            gamesList: state => state.createLpp.gamesList,
        }),
        possibleTables(){
            let usedTable = this.gamesList.filter(el=>el.judge===this.judge).map(el=>el.table)
            let out = this.tableList.map(el=>{
                let isUsed=false
                if (usedTable.indexOf(el.table_id)>=0){
                    isUsed=true
                }
                return{
                    id:el.table_id,
                    isUsed
                }
            })
            return out
        }
    },
    methods:{
        async addGame(){
            this.loadingStatus=true
            if (!this.game){
                
                await this.$store.dispatch(
                    'createLpp/addGame',
                    {judge:this.judge,round:this.round,table:Number(this.$refs.select.value)}
                )
                .catch(err=>{
                    this.$refs.select.value=''
                    if (err.response.status===500 || err.response.status===404)
                        alert("Произошла ошибка на сервере")
                })
                
            }else  if (this.$refs.select.value===''){
                await this.$store.dispatch('createLpp/deleteGame', this.game.id)
                .catch(err=>{
                    this.$refs.select.value=''
                    if (err.response.status===500 || err.response.status===404)
                        alert("Произошла ошибка на сервере")
                })
            }else{

                await this.$store.dispatch(
                    'createLpp/editGame',
                    {
                        gameId:this.game.id,
                        data:{judge:this.judge,round:this.round,table:Number(this.$refs.select.value)}
                    }
                )
                .catch(err=>{
                    this.$refs.select.value=this.game.table
                    if (err.response.status===500 || err.response.status===404)
                        alert("Произошла ошибка на сервере")
                })
                
            }
                
            this.loadingStatus=false
        }
        
    },
    data(){
        return{
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
    .select{
        border:2px solid rgb(50,200,50);
    }
    .selectRed{
        background:red;
    }
    .btn-passive:hover{
        background:#d6d6d6;
    }
</style>
