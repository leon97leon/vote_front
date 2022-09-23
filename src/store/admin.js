import axios from "axios"
import config from '@/scripts/api-config'
import {router} from "@/router"

const API_URL = config['API_LOCATION'] +'api/user/'

export default {
    namespaced: true,
    state: {
      accessToken:JSON.parse(localStorage.getItem('accessToken')||'null'),
      tb:[],
      departments:[],
      positions:[],
      dataToactivate:null,
    },

    mutations: {
      dataToactivate(state,data){
        state.dataToactivate=data
      },
      loginAdmin(state,data){
        state.accessToken=data.auth_token
        localStorage.setItem('accessToken',JSON.stringify(data.auth_token))
      },
      logoutAdmin(state){
        state.accessToken=null
        localStorage.removeItem('accessToken')
      },
      all_positions(state,data){
        state.positions=data
      },

      all_banks(state,data){
        state.tb=data
      },

      all_departments(state,data){
        state.departments=data
      }
    },
    actions: {
      loginAdmin({commit},{password,email}){
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json'},
          url: API_URL + 'token/login/',
          data:{password,email}
        })
        .then(response=>{
          commit('loginAdmin',response.data)
        })

      },
      logoutAdmin({commit,state}){
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'token/logout/',
        })
        .then(response=>{
          commit('logoutAdmin')
          router.push({ name: 'login' })
        })
        .catch(err=>{
          console.log(err.response)
          if (err.response.status===401){
            commit('admin/logoutAdmin')
            router.push({name:'login'})
          }
        })
      },
      getBankInfo({commit,dispatch}){
        axios.get(API_URL + 'all_positions/')
        .then(res=>{
          commit('all_positions',res.data.results)
        })
        axios.get(API_URL + 'all_banks/')
        .then(res=>{
          commit('all_banks',res.data.results)
        })
        axios.get(API_URL + 'all_departments/')
        .then(res=>{
          commit('all_departments',res.data.results)
        })
        
      },

      registerAdmin(contex,user){
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json'},
          url: API_URL + 'users/',
          data:user
        })
      },
      activationUser(contex,{uid,token}){
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json'},
          url: API_URL + 'users/activation/',
          data:{
            uid:uid,
            token:token
          }
        })
      },

    }
  }