<template>
<div  style="margin-bottom:2%">

    <b-navbar style="padding:0 2% 0 2%" type="dark" variant="success" class="admin-page__nav">
        <b-navbar-nav class="mr-auto">
            <b-navbar-brand href="#">VoteApp</b-navbar-brand>
            <b-nav-item to="/adminQuiz" class="mr-auto">Опрос</b-nav-item>
            <b-nav-item v-if="this.admin_status" to="/adminLpp" class="mr-auto">ЛПП</b-nav-item>
        </b-navbar-nav>
        
        <b-navbar-nav class="ml-auto">

            <b-nav-item href="#"  @click="logout()">
                <span v-if="!loadingStatus">Выйти</span> 
                <b-spinner v-else variant="light" small ></b-spinner>
            </b-nav-item>
        </b-navbar-nav>
    </b-navbar>

</div>
</template>
<style >
.nav-exit{
    color: white;
    cursor:pointer;
}
.admin-page__nav{
    display: flex;
    justify-content: space-between; 
}
thead td {
    font-weight:bold;
}
td{
    text-align: center;
    border: 1px solid grey;

}
.table-button{
    height: min-content;
    width: min-content ;
    border:1px solid;
    background: orange!important;;
}
.table-button:hover{
    background: rgb(247, 230, 2)!important;;
    
}
thead td{
    background: #ACE2C8 !important; 
}
td{
   width: 40px;
   vertical-align: top;
}
tbody td{
    padding: 10px 0;
}
</style>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return{
            loadingStatus:false,
            admin_status:false,
        }
    },
    created(){
        this.$store.dispatch("quiz/check").then(res => {this.admin_status = res.data['json']})
    },
    computed: mapState({
            user: state => state.admin.status_admin,
        }),
    methods:{
        async logout(){
            this.loadingStatus=true
            await this.$store.dispatch("admin/logoutAdmin")
            this.loadingStatus=false
        },
        main(){
            this.$router.push({'name': 'admin'})
        }
    },
    
}
</script>