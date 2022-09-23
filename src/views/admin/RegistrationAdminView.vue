<template>
    <div class="registration__admin" style="margin:10%">
        <h1>Регистрация</h1>
        <div v-if="loadingStatus" class="text-center">
            <Loader/>
        </div>
        <div v-else>
            <div>
                <p>Фамилия:</p>
                <input class="authorization__input"
                    v-model="user.last_name"
                    type="text"
                >
            </div>
            <div>
                <p>Имя:</p>
                <input class="authorization__input"
                    v-model="user.first_name"
                    type="text"
                >
            </div>
            <div>
                <p>Эл. почта:</p>
                <input class="authorization__input"
                    v-model="user.email"
                    type="text"
                >
            </div>
            <div>
                <p>ТБ/ЦА:</p>
                <select class="authorization__select" v-model="user.tb">
                <option v-for="item in tb" :key="item.id" :value="item.id">{{item.full_name}}</option>
                </select>
            </div>
            <div>
                <p>Отдел:</p>
                <select class="authorization__select" v-model="user.department">
                    <option v-for="item in departments" :key="item.id" :value="item.id">{{item.short_name}}</option>
                </select>
            </div>
            <div>
                <p>Должность:</p>
                <select class="authorization__select" v-model="user.position">
                    <option v-for="item in positions" :key="item.id" :value="item.id">{{item.name}}</option>
                </select>
                <div class="authorization__input_pincode">
                    <div class="pincode">Ваш пароль: </div>
                    <div><input class="authorization__input_pincode_style" v-model="user.password" type="password"></div>
                </div>
                <div class="authorization__input_pincode">
                    <p style="margin:0;">Повторите пароль:</p>
                    <div><input class="authorization__input_pincode_style" v-model="user.re_password" type="password"></div>
                    
                </div>

            </div>
            <div style="margin-top:5%"> 
                <button @click="registrateAdmin()">
                    <span v-if="!loadingStatus">Зарегистрироваться</span> 
                    <b-spinner v-else variant="light" small ></b-spinner>
                </button>
            </div>
            <div class="authorization-admin--auth-new-user" style="padding-bottom:10%"> 
                <p class="line">или <router-link to="login">Авторизуйтесь</router-link></p>
            </div>
        </div>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import Loader from '@/components/Loader'
export default{
    components:{
        Loader
    },
    data(){
        return{
            loadingStatus:false,
            user:{
                password: '',
                re_password:'',
                first_name: '',
                last_name: '',
                tb: null,
                department: null,
                position: null,
                email: '',
                username:'',
            },
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
    methods:{
        async registrateAdmin(){
            if (this.user.password!=this.user.re_password) {
                alert('Пароль и повторенный пароль не совпадают')
                return
            }
            this.user.username=this.user.email
            this.loadingStatus=true
            await this.$store.dispatch('admin/registerAdmin', this.user)
            .then(response=>{
                this.$router.push({name:'login'})
            })
            .catch(err=>{
                console.log(err.response.data)
                if (err.response.data.password) alert('Пароль - '+String(err.response.data.password).toLowerCase())
                if (err.response.data.email) alert('Эл. почта - '+String(err.response.data.email).toLowerCase())
                if (err.response.data.first_name) alert('Имя - '+String(err.response.data.first_name).toLowerCase())
                if (err.response.data.last_name) alert('Фамилия - '+String(err.response.data.last_name).toLowerCase())
                if (err.response.data.tb) alert('ТБ - '+String(err.response.data.tb).toLowerCase())
                if (err.response.data.position) alert('Должность - '+String(err.response.data.position).toLowerCase())
                if (err.response.data.department) alert('Отдел - '+String(err.response.data.department).toLowerCase())
            })
            this.loadingStatus=false
        },
    }
}
</script>