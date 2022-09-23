import axios from "axios"
import config from '@/scripts/api-config'
import admin from "@/store/admin.js"
import store from  '@/store/index.js'
import {router} from "@/router"

const API_URL = config['API_LOCATION'] + 'api/bestlp/'

export default {
    namespaced: true,
    state: {
      participantList:[],
      roundList:[],
      tmpRoundList:[],
      tableList:[],
      gamesList:[],
    },
    getters: {
      getParticipantById(state){
        return (participantId)=>state.participantList.find(el=>el.id===participantId)
      },
      roundById(state){
        return (roundId) => state.tmpRoundList.find(el=>el.id===roundId)
      },
      gameForRound(state){
        return (roundId)=> {
          return state.gamesList.filter(el => el.round == roundId)
        }
      },
      tableParticipant(state){
        return (tableID)=>{
          const table = state.tableList.find(el=>el.id===tableID)
          let out=[]
          for (const item of table.participant){
            out.push(state.participantList.find(el=>el.id===item))
          }
          return out
        }
      },
      participantWithoutTable(state){
        let out=[].concat(state.participantList)
        for (let item of state.tableList){
          for (let id of item.participant){
            let ind=out.findIndex(el=>el.id===id)
            out.splice(ind, 1)
          }
        }
        return out
      }
    },
    mutations: {
      selectParticipant(state,participantID){
        let ind = state.participantList.findIndex(el=>el.id===participantID)
        state.participantList[ind].isSelected=!state.participantList[ind].isSelected
      },
      participantList(state,data){
        state.participantList=data
      },
      changeRound(state,data){
        const ind = state.tmpRoundList.findIndex(el=> el.id===data.id)
        state.tmpRoundList[ind]={...state.tmpRoundList[ind], ...data}
      },
      clearRoundList(state){
        state.tmpRoundList=state.roundList
      },
      roundList(state,data){
        state.roundList=data
        state.tmpRoundList=data
      },
      tableList(state,data){
        state.tableList=data
      },
      gamesList(state,data){
        state.gamesList=data
      }
    },
    actions: {
      clearAllResults(contex){
        return axios({
          method:'get',
          url: API_URL + '/delete_all_results/',
          //headers: {Authorization: 'Token ' + admin.state.accessToken},
        })
      },
      addGame({dispatch},data){
        let formData = new FormData()
        for ( const key in data ) {
          formData.append(key, data[key])
        }
        return axios({
          method:'post',
          url: API_URL + '/add_game/',
          headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
          data: formData,
        })
        .then(()=>{
          dispatch('gamesList')
        })

      },
      editGame({dispatch},{gameId,data}){
        return axios({
          method:'put',
          url: API_URL + 'edit_delete_game/'+String(gameId)+'/',
          headers: {Authorization: 'Token ' + admin.state.accessToken},
          data: data,
        })
        .then(()=>{
          dispatch('gamesList')
        })

      },
      deleteGame({dispatch},gameId){
        return axios({
          method:'delete',
          url: API_URL + 'edit_delete_game/'+String(gameId)+'/',
          headers: {Authorization: 'Token ' + admin.state.accessToken},
        })
        .then(()=>{
          dispatch('gamesList')
        })

      },
      editTable({dispatch},{table_id,participant}){
        return axios({
          method:'put',
          url: API_URL + 'edit_delete_table/'+String(table_id)+'/',
          headers: {Authorization: 'Token ' + admin.state.accessToken},
          data: {table_id, id:table_id, participant},
        })
        .then(()=>{
          dispatch('tableList')
        })
        .catch(err=>{console.log(err.response)})
        
      },
      editRound({state},roundId){
        return axios({
          method:'put',
          url: API_URL + 'rounds/edit_delete_round/'+String(roundId)+'/',
          headers: {Authorization: 'Token ' + admin.state.accessToken},
          data: state.tmpRoundList.find(el=>el.id===roundId),
        })
        .catch(err=>{console.log(err.response)})
      },
      editRounds({state,dispatch}){
        const promises=[]
        for (let item of state.tmpRoundList){ 
          promises.push(
            dispatch('editRound',item.id))
        }
        return Promise.all(promises)
      },
      gamesList({commit}){
        return axios({
          method:'get',
          url: API_URL + 'add_game/',
          headers:{ Authorization: 'Token ' + admin.state.accessToken },
        })
        .then(response=>{
          commit('gamesList',response.data)
        })
      },
      tableList({commit}){
        return axios({
          method:'get',
          url: API_URL + 'add_table/',
          headers:{ Authorization: 'Token ' + admin.state.accessToken },
        })
        .then(response=>{
          commit('tableList',response.data)
        })
        .catch(error=>{
          console.log(error.response.status)
          if (error.response.status===401){
            commit('admin/logoutAdmin')
            router.push({name:'login'})
          }
        })
        
      },
      
      roundList({commit}){
        return axios({
          method:'get',
          url: API_URL + 'rounds/get-all/',
        })
        .then(response=>{
          commit('roundList',response.data.rounds)
        })
        .catch(error=>{
          console.log(error.response)
        })
        
      },
      participantList({commit}){
        return axios({
          method:'get',
          url:API_URL+'add_participant/',
          headers:{ Authorization: 'Token ' + admin.state.accessToken },
        })
        .then(response=>{
          commit('participantList',response.data)
        })
        .catch(error=>{
          console.log(error)
        })
      },

      async createParticipant(contex,{data,portrait}){
        let formData = new FormData()
        for ( const key in data ) {
          formData.append(key, data[key]);
        }
        formData.append("portrait", portrait)
        return await axios({
            method:'post',
            url: API_URL + '/add_participant/',
            headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
            data: formData,
        })
      },

      async editParticipant(contex,{data,portrait}){
        let formData = new FormData()
        for ( const key in data ) {
          formData.append(key, data[key]);
        }
        formData.append("portrait", portrait)
        return await axios({
            method:'put',
            url: API_URL + '/edit_delete_participant/'+data.id+'/',
            headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
            data: formData,
        })
      },
      async deleteParticipant(contex,participantID){
        return await axios({
          method:'delete',
          url: API_URL + '/edit_delete_participant/'+String(participantID)+'/',
          headers: {Authorization: 'Token ' + admin.state.accessToken},
        })
        .then(()=>{
          contex.dispatch('participantList')
        })
      },
      async deleteJudge(contex,judgeID){
        return await axios({
          method:'delete',
          url: API_URL + '/edit_delete_judge/'+String(judgeID)+'/',
          headers: {Authorization: 'Token ' + admin.state.accessToken},
        })
        .then(()=>{
          store.dispatch('lpp/judgesList')
        })
      },
      async createJudge(contex,{data,portrait}){
        let formData = new FormData()
        for ( const key in data ) {
          formData.append(key, data[key]);
        }
        formData.append("portrait", portrait)
        return await axios({
            method:'post',
            url: API_URL + '/add_judge/',
            headers: {'Content-Type': 'multipart/form-data',Authorization: 'Token ' + admin.state.accessToken},
            data: formData,
        })
        .then(()=>{
          store.dispatch('lpp/judgesList')
        })
      },
      async editJudge(contex,{data,portrait}){
        let formData = new FormData()
        for ( const key in data ) {
          formData.append(key, data[key]);
        }
        formData.append("portrait", portrait)
        return await axios({
            method:'put',
            url: API_URL + 'edit_delete_judge/'+data.id+'/',
            headers: {'Content-Type': 'multipart/form-data',Authorization: 'Token ' + admin.state.accessToken},
            data: formData,
        })
        .catch(err=>{
          console.log(err.response)
        })
      },
      
    }
  }