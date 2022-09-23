<template>
<div class="container card" style="padding-top:5%">
    <h1>Подтверждение аккаунта</h1>
    <div v-if="loadingStatus" class="text-center">
        <Loader/>
    </div>
    <div v-else-if="res===204" >
        <p>Ваш аккаунт подтвержден!</p>
    </div>
    <div v-else-if="res===0">
        <p>Не удалось подтвердить аккаунт</p>
    </div>
    <a href="/login">На страницу авторизации</a>
</div>
 
</template>

<script>
import Loader from '@/components/Loader'
import { mapState } from 'vuex'
export default {  
    components:{
        Loader,
    },
    computed: mapState ({
        dataToactivate: state => state.admin.dataToactivate
    }),
    async mounted(){
        if (this.dataToactivate){
            let data=this.dataToactivate.split('/')
            await this.$store.dispatch('admin/activationUser',{uid:data[data.length-2],token:data[data.length-1]})
            .then(response=>{
                this.res=response.status
            })
            .catch(err=>{
                console.log(err.response)
            })
            
        }
        this.loadingStatus=false
    },
    data(){
        return{
            loadingStatus:true,
            res:0,
        }
    },
}
</script>
<style scoped lang="scss">


</style>
