<template>
  <div class="container overflow-auto">
    <div class="row justify-content-center mt-5">
      <template  v-if="loadingStatus">
        <div class="text-center">
                    <Loader />
        </div>
      </template>
      <template v-else>
        <div v-if="this.game.status==false" class="col-md-5 col-12">
          <h1 v-if="this.game.authorization_needed">Добрый день,{{auth.name}}!</h1>
          <h1 v-else>Добрый день, участник!</h1>
          <h2>Опрос откроется в день игры</h2>
          <!-- <img src="@/../public/quiz.png" style="width: 400px !important;" alt=""> -->
        </div>
        <div v-if="this.game.part[this.id_part].status==false" class="col-md-5 col-12">
          <h1 v-if="this.game.authorization_needed">Добрый день,{{auth.name}}!</h1>
          <h1 v-else>Добрый день, участник!</h1>
          <h2>Дополнительный раздел игры откроется позднее</h2>
          <!-- <img src="@/../public/quiz.png" style="width: 400px !important;" alt=""> -->
        </div>
        <div v-if="this.game.status==true && this.game.part[this.id_part].status==true " class="col-md-10 col-12 row">
          <div class="row justify-content-md-center">
            <img v-if="game.image" :src="path + game.image" class="col-md-7 col-12"  style="object-fit: cover;height: 130px;"  alt="">
            <img v-else src="@/../public/header_quiz.jpg" class="col-md-7 col-12" style="height:130px;object-fit: cover;" alt="">
        </div>
          <h1>{{game.name}}</h1>
          <h2 v-if="game.authorization_needed">Приветствуем вас, {{auth.name}}!</h2>
          <h2 v-else>Приветствуем вас, участник!</h2>
          <h4>{{this.game.part[this.id_part].name}}</h4>
          <div>
            <!-- {{first()}} -->
            <div v-for="item in this.game.part[this.id_part].question" :key="item.id_label" class="question">
              <h5>Вопрос {{item.id_label}}</h5>
              <h5>{{item.body}}</h5>
              <div v-if="item.answer_type==3" class="col-md-5 col-12"> 
                  <input class="col-12" v-model="answer[item.id_label]['ans']" type="text" placeholder="Краткий ответ">
              </div>
              <div v-if="item.answer_type==1" class="col">
                <b-form-radio-group>
                  <div  v-for="(ch,index) in item.choise" >
                    <b-form-radio style="display:flex" name="radio"  v-model="answer[item.id_label]['ans']" size="lg" class="p-0 rb" :value="index">{{ch.choice}}</b-form-radio>
                  </div>
                </b-form-radio-group>
              </div>
              <div v-if="item.answer_type==2" class="col">
                <b-form-checkbox-group  v-model="answer[item.id_label]['ans']">
                  <template  v-for="(ch,index) in item.choise" >
                    <b-form-checkbox style="display:flex" size="lg"  class="p-0" :value="index">{{ch.choice}}</b-form-checkbox>
                  </template>
                </b-form-checkbox-group>

              </div>
              <div v-if="item.answer_type==5" class="row">
                <div class="col-md-5 col-12"> 
                  <input class="col-12" v-model="answer[item.id_label]['ans']" type="text" placeholder="Краткий ответ">

                </div>

                <h6 class="col-md-2 col-12 text-end pl-0 mt-2 mt-md-0" style="width:max-content">
                  Повысить балл
                </h6>
                <select class=" col-md-2 col-lg-1 col-5 mt-2 mt-md-0" v-model="answer[item.id_label]['price']"  name="" id="1">
                            <option value="" selected disabled>Балл</option>
                            <option value="1">+1</option>
                            <option value="2">+2</option>
                        
                        </select>
              </div>
              <div v-if="item.answer_type==4" style="overflow-x:auto">
                <table class="table table-hover" style=" width: max-content;">
                  <thead class="table--theader">
                    <tr>
                      <td></td>
                      <template  v-for="ch_4 in item.rand_choise.choice1">
                        <td>{{ch_4}}</td>
                      </template>

                    </tr>
                  </thead>

                  <tbody v-for="(ch_4_2,index_4) in item.rand_choise.choice2">
                    <td class="row_answer">{{ch_4_2}}</td>
                    <template v-for="(item_4,index_4_2) in item.rand_choise.choice1">
                      <td>
                        <b-form-radio :name="'row'+index_4+1" size="lg" :value="index_4_2" v-model="answer[item.id_label]['ans'][index_4]"></b-form-radio>
                      </td>
                    </template>
                  </tbody>  

                </table>
              </div>
              <div v-if="item.answer_type==6" class="col-md-5 col-12"> 
                  <input class="col-12 mb-2" v-model="answer[item.id_label]['ans']" type="text" placeholder="Краткий ответ">
                  <p>Штраф за неверный ответ <span class="fine">-{{item.fine}}</span></p>
              </div>
            </div>
            

            </div>
            <div class="row justify-content-center mt-4 ">
              <button class="col-12 col-md-4 mb-4"  @click="send_answer">Отправить ответ</button>
              <b-modal id="modal-3" hide-footer @hidden="nextround()">
                <!-- <p class="my-4">Hello from modal!</p> -->
                <div class="row justify-content-center">

                  <h4 class="col-11 text-center">Ваш ответ отправлен</h4>
                  
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-success" @click="closeround()">Следующий раунд</button>
                </div>
              </b-modal>

                <!--  Модалка для последнего раунда-->
                <b-modal id="modal-4" hide-footer @hidden="finish()" >
                            <div class="row justify-content-center">

                  <h4 class="col-11 text-center">Ваш ответ отправлен</h4>
                  <img src="@/../public/quiz.png" style="width: 300px !important">

                </div>
                <div class="modal-footer">
                  <button type="button" @click="finish()" class="btn btn-success">Спасибо за игру!</button>
                </div>
              </b-modal>
                <!--  Модалка для финиша-->
                <b-modal id="modal-5" hide-footer @hidden="finish()" >
                            <div class="row justify-content-center">

                  <h4 class="col-11 text-center">Вы уже проходили опрос!</h4>
                  <img src="@/../public/quiz.png" style="width: 300px !important">

                </div>
                <div class="modal-footer">
                  <button type="button" @click="finish()" class="btn btn-success">Спасибо за игру!</button>
                </div>
              </b-modal>
            </div>
          </div>
        </template>
      </div>
    </div>

</template>
<script>
import Loader from '@/components/Loader'
import config from '@/scripts/api-config'
import { mapState } from 'vuex';
export default {
  components: {
            Loader
        },
  data() {
    return {
        game_one:{},
        answer:{},
        grid:[],
        path:'',
        loadingStatus:true
          }
  },
  props:['id','id_part'],
  async mounted() {
        this.path=config['API_LOCATION']
        this.$store.dispatch('quiz/chechauth', {'id_quiz':this.id})
        this.$store.dispatch('quiz/partList_forgame',this.id)
        this.loadingStatus=false
        
        

        
    },
    beforeUpdate(){
          //this.loadingStatus=true
          this.$store.dispatch('quiz/check_start',{'id':this.id}).then(res=>{
            var result = res.data.res
            console.log(result == "Finish")
            if (result == "Finish"){
              this.$bvModal.show('modal-5');
            }
            else if (result != this.id_part){
              this.$router.push("/UserQuiz/"+this.id+'/'+result)
            }
          })
          if (this.game.status && this.id_part == 0){
            this.$store.dispatch('quiz/quiz_add_start',{'id':this.id})
          }
          var arr = this.game.part[this.id_part].question
          var index;
          for (index = 0; index < arr.length; ++index) {
          //this.game.part[this.id_part].question.forEach((ques,index) => {
              if (arr[index].answer_type==1)
              {
                this.answer[index+1]={'ans':[],'id':arr[index].id}
              }
              if (arr[index].answer_type==2)
              {
                this.answer[index+1]={'ans':[],'id':arr[index].id}
              }
              if (arr[index].answer_type==3)
              {
                this.answer[index+1]={'ans':'','id':arr[index].id}
              }
              if (arr[index].answer_type==4)
              {
                this.answer[index+1]={'ans':{},'id':arr[index].id}
                arr[index].choise.forEach((ch,index_ch) => {
                  this.answer[index+1]['ans'][index_ch]=''
                })
                this.grid.push(arr[index].rand_choise)
                
              }
              if (arr[index].answer_type==5)
              {
                this.answer[index+1]={'ans':'','price':'','id':arr[index].id}
              }
              if (arr[index].answer_type==6)
              {
                this.answer[index+1]={'ans':'','id':arr[index].id}
              }
                
            }
            
          
        },
    computed: mapState({
            auth: state => state.quiz.authPart,
            game: state => state.quiz.part_forgame,
        }),
    methods: {
      closeround(){this.$bvModal.hide('modal-3');},
        nextround(){
          console.log(this.game.part.length)
          if (this.id_part < this.game.part.length - 1)
          {
            // console.log(this.id_part)
            var next_id = parseInt(this.id_part)+1
            this.$router.push("/UserQuiz/"+this.id+'/'+next_id)
            
          }
          
        },
        finish(){
          this.$router.push({name:'Index'})
        },
        
        send_answer(){
          
          if (this.id_part >= this.game.part.length - 1)
          {
            this.$store.dispatch('quiz/add_finish', {'part':this.id_part,'quiz':this.id})
            this.$store.dispatch('quiz/add_finish', {'all':true,'quiz':this.id})
            this.$bvModal.hide('modal-3');
            this.$bvModal.show('modal-4');
            
          }
          else
          {
            this.$store.dispatch('quiz/add_finish', {'part':this.id_part,'quiz':this.id})
            this.$bvModal.show('modal-3');
          }
          this.$store.dispatch('quiz/chech_ans', {'answer':this.answer,'grid':this.grid,'part':this.id_part,'quiz':this.id})
          
        }

    }


}

</script>
<style>
.close {
  width: auto;
}

.question {
  margin-top: 2%;
}

.custom-control-label {
  padding-left: 1%;
}

.row_answer {
  vertical-align: middle;
}
.rb input[type='radio']
{
  margin-bottom: auto;
  margin-top:10px;
}
input[type='checkbox']{
  margin-top:0px;

}
.fine{
  border:3px white solid;
  background:rgb(233, 233, 233);
  color:red;
  padding: 0px 10px;
  border-radius: 10px;
}
</style>