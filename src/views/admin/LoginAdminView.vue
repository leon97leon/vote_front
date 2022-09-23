<template>
    <div class="authorization-admin--container" style="margin:10%">
        <h1 style="border-bottom:none;">Авторизация</h1>
        <p style="margin:0;">Email:</p>
        <input class="authorization__input"
            v-model="user.email"
            placeholder="email"
            type="text"
        >
        <p style="margin:0;">Пароль:</p>
        <div style="display:flex; flex-direction: column; justify-content:center; aling-items:center;">
        <input class="authorization__inputl"
            style="text-align:center"
            v-model="user.password"
            placeholder="Пароль"
            :type="passwordFieldType"
            required
        >
        <div class="form-check form-switch"  style='color:grey; font-size:14.5px;'>
            <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" @change="switchVisibility()">
            <label class="form-check-label" for="flexSwitchCheckDefault">Показать пароль </label>
        </div>
        </div>

        <button  @click="signIn()" >
            <span v-if="!loading">Войти</span> 
            <b-spinner v-else variant="light" small ></b-spinner>
        </button>

        <div class="authorization-admin--auth-new-user"> 
            <p class="line">или <router-link to="register">Зарегистрируйтесь</router-link></p>
        </div>

    </div>
</template>
<script>
import { mapState } from 'vuex';
export default{
    data(){
        return{
            loading: false,
            user:{
                password:'',//'1AdmiN1'
                email:'',//'admin@admin.ru'
            },
            registration: false,
            passwordFieldType: "password",
        }
    },
    components:{


    },
    computed: mapState ({

    }),

    methods:{
        switchVisibility() {
            this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
        },
        async signIn(){
            this.loading=true;
            await this.$store.dispatch('admin/loginAdmin', this.user)
            .then(res=>{
                this.$router.push({name:'admin'})
            })
            .catch(err=>{
                console.log(err.response)
                alert('Не удалось авторизоваться')
                this.user={} 
            })   
                       
            this.loading=false;
        },

        loadRegForm(){
           this.$parent.$options.methods.loadForm(this.registration);
        },
    }
}
</script>