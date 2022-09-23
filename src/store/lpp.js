import axios from "axios"
import config from '@/scripts/api-config'
import {router} from "@/router"
import createLpp from "@/store/createLpp.js"
import { faEllipsis } from "@fortawesome/free-solid-svg-icons"

const API_URL = config['API_LOCATION'] + 'api/bestlp/'

function findRoundIdByNumber(numRound){
  return createLpp.state.roundList.find(el=>el.number===numRound).id
}

export default {
    namespaced: true,
    state: {
      gamesList:[],
      judgesList:[],
      authJudge:JSON.parse(localStorage.getItem('authJudge')||'null'),
      numRound:JSON.parse(localStorage.getItem('numRound')||'1'),
      totalScore:[],
      scoreArr:[],
    },
    getters: {
      getJudgeById(state){
        return (judgeId) => state.judgesList.find(el=>el.id===judgeId)
      },
      scoreArr(state){
        return (roundID)=> {
          if (typeof state.scoreArr.find(el=>el.roundID === roundID)!=='undefined'){
            return state.scoreArr.find(el=>el.roundID === roundID).scoreArr
          }else {
            return []
          }
        }
      },
      numRound(state){
        return state.numRound
      },
      tableID(state){
        return (numRound)=>state.gamesList[numRound].table.table_id
      },
      roundData(state){
        return (numRound)=>state.gamesList[numRound].round
      },
      participantRound(state){
        return (numRound)=> state.gamesList[numRound].table.participant
      },
      allParticipant(state){
        return state.gamesList.map(el=>el.table.participant)
      },
      diagramData(state){
        return {labels:state.totalScore.map(el=>el.name), scores:state.totalScore.map(el=>Number(el.score.toFixed(1)))}
      },
      authJudge(state){
        return state.authJudge
      },
      currentScore(state){
        //roundID = numRound
          return ({roundID,participantID})=>{
            const judgeID=state.gamesList.find(el=>el.round.id===roundID).judge.id

            const score = state.gamesList.find(el=>el.round.id===roundID)
              .table.participant.find(el2=>el2.id===participantID)
              .score.filter(el3=>el3.round.id===roundID)
              .find(el4=>el4.judge.id===judgeID)
            try{
              return {
                roundID:score.round.id,
                judgeID:score.judge.id,
                participantID,
                result_management:score.result_management,
                self_management:score.self_management,
                client_centricity:score.client_centricity,
              }
            }catch(err){
              if (err instanceof TypeError) {
                  return {
                    roundID: roundID,
                    judgeID: judgeID,
                    participantID,
                    result_management: null,
                    self_management: null,
                    client_centricity: null
                }
              }else{ throw err }
            }
          }
      }
    },
    mutations: {
      scoreArr(state,{scoreArr,roundID}){
        let ind =state.scoreArr.findIndex(el => el.roundID===roundID)
        if (ind!==-1){
          state.scoreArr[ind].scoreArr=scoreArr
        }else{
          state.scoreArr.push({roundID,scoreArr})
        }
        
      },
      errorLoginHandler(state,errorStatus){
        router.push({name:'LppLogin'})
        if(errorStatus===404){
          alert('Пользователь не найден')
          return 
        }
        if (errorStatus===403){
          alert('Неверный код подтверждения')
          return 
        }
        alert('Неизвестная ошибка')
      },
      numRound(state,numRound){
        state.numRound=numRound
        localStorage.setItem('numRound',JSON.stringify(numRound))
      },
      gamesList(state,gamesList){
        state.gamesList=gamesList
      },
      judgesList(state,judgesList){
        state.judgesList=judgesList
      },
      loginJudge(state,judge){
        state.authJudge=judge
        localStorage.setItem('authJudge',JSON.stringify(judge))
      },
      clearJudgeSettings(state){
        state.numRound='1'
        localStorage.setItem('numRound','1')
      },
      totalScore(state,totalScore){
        state.totalScore=totalScore.data
      },
      closeRound(state,numRound){
        try{
          if (numRound===1){
            state.authJudge.round_1_finished=true
          }
          if (numRound===2){
            state.authJudge.round_2_finished=true
          }
          if (numRound===3){
            state.authJudge.round_3_finished=true
          }
        }catch(err){
          console.log(err)
        }
      },

      closeRoundByIdJudge(state,{numRound,judgeID}){
        if (state.judgesList.length){
          if (numRound===1){
            state.judgesList.find(el=>el.id===judgeID).round_1_finished=true
          }
          if (numRound===2){
            state.judgesList.find(el=>el.id===judgeID).round_2_finished=true
          }
          if (numRound===3){
            state.judgesList.find(el=>el.id===judgeID).round_3_finished=true
          }
        }

      },

      openRound(state,{numRound,judgeID}){
        if (numRound===1){
          state.judgesList.find(el=>el.id===judgeID).round_1_finished=false
        }
        if (numRound===2){
          state.judgesList.find(el=>el.id===judgeID).round_2_finished=false
        }
        if (numRound===3){
          state.judgesList.find(el=>el.id===judgeID).round_3_finished=false
        }
      }
    },
    actions: {
      loginJudge(context,params){
        return axios.post(API_URL+'authorize/judge-login/',
        {
          email: params.email,
          validation_code: params.validationCode
        })
      },
      judgesList({commit}){
        return axios.post(API_URL+'judges/get-finished/')
        .then(response=>{
          commit('judgesList',response.data.judge)
        })
        .catch(error=>{
          console.log(error)
        })
      },

      sendScore(contex,score){
        /*score={
          roundID: 1,
          judgeID: 2,
          participantID: 3,
          result_management: 1,
          self_management: 1,
          client_centricity: 1
        }*/
        return axios({
            method:'put',
            headers: {'Content-Type':'application/json'},
            url: API_URL + 'participants/save-score/',
            data:score
        })
      },
      sendRoundScores({dispatch},allScores){
        const promises=[]
        for (let item of allScores){ //for all participant's round
          promises.push(
            dispatch('sendScore',item))
        }
        return Promise.all(promises)
      },

      getGame(contex,params) {
        return axios.get(API_URL + 'participants/',{params})
      },
      getGamesList({commit,dispatch},judgeID){
        const promises=[]
        for (let ind=1; ind<4;ind+=1){ //for any rounds 1,2,3
          let roundID = findRoundIdByNumber(ind)
          promises.push(
            dispatch('getGame',{
              judgeID:judgeID,
              roundID:roundID
          }))
        }
        return Promise.all(promises)
        .then(responseArr => {
          //console.log(responseArr)
          commit('gamesList',responseArr.map(el=>el.data.game))
        })
        .catch(error=>{
          console.log(error)
        })
      },

      setNumRound({commit},numRound){
        commit('numRound',numRound)
      },

      closeRound({commit},{judgeID,numRound}){
        return axios({
          method:'put',
          headers: {'Content-Type':'application/json'},
          url: API_URL + `judges/finish-score/${judgeID}/`,
          data:{roundID:numRound}
        })
        .then(
          commit('closeRound',numRound),
          commit('closeRoundByIdJudge',{judgeID,numRound})
        )
        .catch(error=>{
          console.log(error)
        })
      },

      openRound({commit},{judgeID,numRound}){
        return axios({
          method:'put',
          headers: {'Content-Type':'application/json'},
          url: API_URL + `judges/open-score/${judgeID}/`,
          data:{roundID:numRound}
        })
        .then(
          commit('openRound',{judgeID,numRound})
        )
        .catch(error=>{
          console.log(error)
        })
      },

      getTotalScore({commit}){
        return axios.get(API_URL + 'participants/statistics/')
        .then((response)=>{
          commit('totalScore',response.data)
        })
        .catch(error=>{
          console.log(error)
        })
      },
    }
  }