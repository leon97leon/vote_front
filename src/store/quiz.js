import axios from "axios"
import config from '@/scripts/api-config'
import admin from "@/store/admin.js"
import store from  '@/store/index.js'
import {router} from "@/router"

const API_URL = config['API_LOCATION'] + 'api/quiz/'
export default {
    namespaced: true,
    state: {
      accessToken:JSON.parse(localStorage.getItem('accessToken')||'null'),
      tb:[],
      authPart:JSON.parse(localStorage.getItem('authPart')||'null'),
      departments:[],
      positions:[],
      dataToactivate:null,
      quiz_field:[],
      fio:"",
      quiz_all:[],
      part_one:{},
      part_forgame:{},
      quiz_svod:{},
      ques_svod:{},
      answer_svod:{},
      part_svod:{},
      reg_svod:{},
      updatequiz:{}
    },

    mutations: {
      dataToactivate(state,data){
        state.dataToactivate=data
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
      quiz_field(state,data){
        state.quiz_field=data
      },
      quiz_all(state,data){
        state.quiz_all=data.quiz
      },
      part_one(state,data){
        state.part_one=data.quiz
      },
      part_forgame(state,data){
        state.part_forgame=data.quiz
      },
      fio(state,data){
        state.fio=data
      },

      all_departments(state,data){
        state.departments=data
      },
      loginPart(state,part){
        state.authPart=part
        localStorage.setItem('authPart',JSON.stringify(part))
      },
      logoutPart(state){
        state.authPart=null
        localStorage.removeItem('authPart')
      },
      quiz_svod(state,data){
        state.quiz_svod=data
      },
      ques_svod(state,data){
        state.ques_svod=data
      },
      answer_svod(state,data){
        state.answer_svod=data
      },
      part_svod(state,data){
        state.part_svod=data
      },
      reg_svod(state,data){
        state.reg_svod=data
      },
      updatequiz(state,data){
        state.updatequiz=data.quiz
      },
    },
    getters: {authPart(state){
      return state.authPart
    },
  },
    actions: {

        async addQuiz(contex,{data,avatar}){
            console.log(avatar)
            const response = await axios({
                  method:'post',
                  url: API_URL+'quizzes/',
                  headers: {'Content-Type': 'application/json', Authorization: 'Token ' + admin.state.accessToken},
                  data: data,
              })
              console.log(response.data.id)

            if (avatar){
              console.log("OK")
              let formData = new FormData();
              formData.append("image", avatar)
              formData.append("id", response.data.id)
              formData.append("type", "quiz")
              await axios({
                method:'post',
                url: API_URL+'quizzes_upload/',
                headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
                data: formData,
            })
            }
            for ( const key_value in data.part ) {
              let elem = data.part[key_value]
              for ( const key_ques in elem.question )
              {
                let elem_ques = elem.question[key_ques]
                if (elem_ques.files){
                        let formData_ques = new FormData();
                        console.log(elem_ques.files)
                        formData_ques.append("files", elem_ques.files)
                        formData_ques.append("id", response.data.part[data.part.indexOf(elem)].question[elem.question.indexOf(elem_ques)].id)
                        formData_ques.append("type", "question")
                        await axios({
                          method:'post',
                          url: API_URL+'quizzes_upload/',
                          headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
                          data: formData_ques,
            })
                      }
              }
            }
            router.push("/adminQuiz/");
            alert("Опрос создан!")

            // forEach(data.part)(elem =>{
            //   forEach(elem.question)(ques =>{
            //     if (ques.files){
            //       console.log(ques)
            //     }
            //   });
            // })
      },

      async reg_quiz(context,data){
        console.log(data)

        const response = await axios({
          method:'post',
          url: API_URL+'quizzes_reg/',
          headers: {'Content-Type': 'application/json'},
          data: data,
        })
        
        console.log(response.data)
        router.push("UserAuth/"+response.data.id)
      },
      quiz_field({commit,dispatch},data){
        console.log(data)

        return axios({
          method:'post',
          url: API_URL+'quizzes_reg/',
          headers: {'Content-Type': 'application/json'},
          data: data,
        })
    },
        
        
      loginPart(context,params){
        return axios.post(API_URL+'authorize/participant-login/',
        {
          email: params.email,
          pin: params.pin,
          id:params.id
        })
      },
      resetpin(context,params){
        return axios.post(API_URL+'reset_pin/',
        {
          email: params.email,
          quiz: params.quiz
        }).then(res =>{
        alert("Сообщение с пин-кодом отправлено на почту!")}).catch(function (error) {
          if (error.response) {alert('Участник с такой личной почтой не обнаружен!')}})
      },
      quizList({commit,state}){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'quiz_all/',
        }).then(response=>{
          commit('quiz_all',response.data)
        }).catch(err =>{ console.log(err)
          location.reload()})
        
      },
      check({commit,state}){
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'check/'
        })
      },
      UpdateQuiz({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'updatequiz/',
          data:{'id':id,'type':'first'},
        }).then(response=>{
          commit('updatequiz',response.data)
        })
        
      },
      RefreshQuiz({commit,state},data){
        data['type']='update'
        const response = axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'updatequiz/',
          data:data,
        })
        // if (avatar){
        //   console.log("OK")
        //   let formData = new FormData();
        //   formData.append("image", avatar)
        //   formData.append("id", response.data.id)
        //   formData.append("type", "quiz")
        //   await axios({
        //     method:'post',
        //     url: API_URL+'quizzes_upload/',
        //     headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
        //     data: formData,
        // })
        // }
        // for ( const key_value in data.part ) {
        //   let elem = data.part[key_value]
        //   for ( const key_ques in elem.question )
        //   {
        //     let elem_ques = elem.question[key_ques]
        //     if (elem_ques.files){
        //             let formData_ques = new FormData();
        //             console.log(elem_ques.files)
        //             formData_ques.append("files", elem_ques.files)
        //             formData_ques.append("id", response.data.part[data.part.indexOf(elem)].question[elem.question.indexOf(elem_ques)].id)
        //             formData_ques.append("type", "question")
        //             await axios({
        //               method:'post',
        //               url: API_URL+'quizzes_upload/',
        //               headers: {'Content-Type': 'multipart/form-data', Authorization: 'Token ' + admin.state.accessToken},
        //               data: formData_ques,
        // })
        //           }
        //   }
        // }
        // router.push("/adminQuiz/");
        // alert("Опрос обновлен и сохранен!")
      },
      partList({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'part_one/',
          data:{'id':id},
        }).then(response=>{
          commit('part_one',response.data)
        })
        
      },
      fio({commit,state}){
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'fio/',
        })
        .then(response=>{
          commit('fio',response.data)
        })
      },
      check_start({commit,state},data){
        data['auth']=state.authPart
        return axios({
          method:'post',
          headers: {'Content-Type':'application/json' },
          url: API_URL + 'check_start/',
          data:data
        })
      },
      chechauth({commit,state},data)
      {
        axios({
          method:'post',
          url: API_URL+'quizzes_reg/',
          headers: {'Content-Type': 'application/json'},
          data: data,
        }).then(response =>{
          if (response.data.authorization_needed && !state.authPart)
          {
            router.push("/UserAuth/"+data.id_quiz)
          }
        })
      },
      
      regPart(context,params){
        axios({
          method:'post',
          url: API_URL+'add_participant/',
          headers: {'Content-Type': 'application/json'},
          data:  {
            email: params.email,
            pin: params.pin,
            familia:params.familia,
            name:params.name,
            tb:params.tb,
            position:params.position,
            department:params.department,
            quiz:params.quiz,
  
  
  
          }
        }).then(res =>{router.push("/UserAuth/"+res.data.quiz);
      alert("Вы успешно зарегистрировались, авторизируйтесь!")}).catch(function (error) {
        if (error.response) {alert('Участник с такой личной почтой уже существует!')}})

      },
      regPartAuth(context,params){
        return axios({
          method:'post',
          url: API_URL+'add_participant_un_auth/',
          headers: {'Content-Type': 'application/json'},
          data:params,
        })

      },
      async changestatus(contex,id)
      {
        return axios.post(API_URL+'changestatus/',
        {
          id: id,
        })
      },
      async changestatuspart(contex,id)
      {
        return axios.post(API_URL+'changestatuspart/',id
        )    
      
      },
      async deletequiz({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'delete_quiz/',
          data:{'id':id}
        })
      },
      async partList_forgame({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' },
          url: API_URL + 'part_forgame/',
          data:{'id':id},
        }).then(response=>{
          console.log(response.data)
          commit('part_forgame',response.data)
        })
      },
      async chech_ans({commit,state},data){
        data['auth']=state.authPart
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' },
          url: API_URL + 'answer_game/',
          data:data
        })
      },
      async quiz_add_start({commit,state},id){
        return axios.post(API_URL+'quiz_add_start/',id)
         
      },
      async quiz_svod({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json', Authorization: 'Token ' + state.accessToken  },
          url: API_URL + 'quiz_svod/',
          data:id,
        }).then(response=>{
          console.log(response.data)
          commit('quiz_svod',response.data)
        })
      },
      async ques_svod({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' , Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'ques_svod/',
          data:id,
        }).then(response=>{
          console.log(response.data)
          commit('ques_svod',response.data)
        })
      },
      
      async add_finish({commit,state},data){
        data['auth']=state.authPart
        axios({
          method:'post',
          headers: {'Content-Type':'application/json'},
          url: API_URL + 'finish_part/',
          data:data
        })
      },
      checkpart({commit,state},data)
      {
        axios({
          method:'post',
          url: API_URL+'check_part/',
          headers: {'Content-Type': 'application/json'},
          data: data,
        }).then(response =>{
          if (response.data.json != "start")
          {
            router.go(0);
          }
        })
      },
      async answer_svod({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' , Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'answer_svod/',
          data:id,
        }).then(response=>{
          console.log(response.data)
          commit('answer_svod',response.data)
        })
      },
      async answer_update({commit,state},item){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' , Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'answer_update/',
          data:item,
        })
      },
      async part_svod({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' , Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'part_svod/',
          data:id,
        }).then(response=>{
          console.log(response.data)
          commit('part_svod',response.data)
        })
      },
      async reg_svod({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' , Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'reg_svod/',
          data:id,
        }).then(response=>{
          console.log(response.data)
          commit('reg_svod',response.data)
        })
      },
      deleteanswer({commit,state},id){
        axios({
          method:'post',
          headers: {'Content-Type':'application/json' , Authorization: 'Token ' + state.accessToken },
          url: API_URL + 'deleteanswer/',
          data:id,
        })
      },

    }
}