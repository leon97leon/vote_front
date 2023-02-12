import Vue from 'vue';
import Router from 'vue-router';
Vue.use(Router);
import store from '@/store/index.js';

export const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'Index',
      component: () => import('@/components/Index/Index.vue')
    },
    {
      path: '/api/activation-user',
      name: 'activationUser',
      component: () => import('@/views/admin/ActivationUserView.vue')
    },
    {
      path: '/adminQuiz',
      name: 'adminQuiz',
      component: () => import('@/views/admin/AdminView.vue')
    },
    {
      path: '/adminQuiz/Report:id',
      name: 'Report',
      component: () => import('@/components/ReportMenu/ReportMenu.vue'), props: true
    },
    
    {
      path: '/SectionEdit/:id',
      name: 'SectionEdit',
      component: () => import('@/components/SectionEdit/SectionEdit.vue'), props: true
    },
    {
      path: '/startquiz',
      name: 'StartQuiz',
      component: () => import('@/components/User/StartQuiz.vue'), props: true
    },
    {
      path: '/UserQuiz/:id/:id_part',
      name: 'UserQuiz',
      component: () => import('@/components/User/UserQuiz.vue'), props: true
    },{
      path: '/UserRegistration/:id',
      name: 'UserRegistration',
      component: () => import('@/components/User/UserRegistration.vue'), props: true
    },
    {
      path: '/UserAuth/:id',
      name: 'UserAuth',
      component: () => import('@/components/User/UserAuth.vue'), props: true
    },
    {
      path: '/adminQuiz/:id',
      name: 'QuizNum',
      component: () => import('@/views/admin/QuizInfo/QuizInfo.vue'), props: true
    },
    {
      path: '/login',
      name: 'login',
      // redirect: { name: 'createQuiz', },
      component: () => import('@/views/admin/LoginAdminView.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/admin/RegistrationAdminView.vue')
    },
    {
      path: '/adminLpp',
      name: 'adminLpp',
      component: () => import('@/views/admin/AdminLppView.vue')
    },
    {
      path: '/create-quiz',
      name: 'createQuiz',
      component: () => import('@/views/CreateQuizView.vue')
    },
    {
      path: '/update-quiz/:id',
      name: 'updateQuiz',
      component: () => import('@/views/UpdateQuizView.vue'), props: true
    },
    {
      path: '/create-lpp',
      name: 'createLpp',
      component: () => import('@/views/CreateLppView.vue')
    },
    {
      path: 'results',
      name: 'LppResults',
      component: () => import('@/views/lpp/ResultsView.vue')
    },
    {
      path: '/lpp',
      name: 'lpp',
      redirect: { name: 'LppGame', },
      component: () => import('@/views/lpp/Main.vue'),
      children: [
        {
          path: 'login',
          name: 'LppLogin',
          component: () => import('@/views/lpp/LoginJudgeView.vue')
        },
        {
          path: 'game',
          name: 'LppGame',
          component: () => import('@/views/lpp/GameView.vue'),
        },
      ]
    },
    {
      path: "*",
      component: () => import('@/views/PageNotFoundView.vue')
    },
  ]
})
const interval_id = window.setInterval(function(){}, Number.MAX_SAFE_INTEGER);

// Clear any timeout/interval up to that id
for (let i = 1; i < interval_id; i++) {
  window.clearInterval(i);
}
router.beforeEach(async (to, from, next) => {
  if (to.fullPath.split('/')[1] === 'api' && to.name !== 'activationUser') {
    store.commit('admin/dataToactivate', to.fullPath)
    next({ name: 'activationUser' })
  }
  // if (to.fullPath.split('/')[1] == 'UserQuiz' && !localStorage.getItem('authPart') )
  // {
  //   next({ name: 'StartQuiz' })
    
  // }
  else{next()}
  if (
    to.name == 'StartQuiz' || to.name == 'UserAuth' || to.name == 'UserRegistration' || to.fullPath.split('/')[1] == 'UserQuiz'
  ) {
    next()
  } else {

    if (
      to.fullPath.split('/')[1] === 'lpp' &&
      !localStorage.getItem('authJudge') &&
      to.name !== 'LppLogin'
    ) {
      next({ name: 'LppLogin' })
    } else {
      next()
    }

    if (!localStorage.getItem('accessToken') &&
      to.name !== 'login' && to.name !== 'register' && to.name !== 'Index' &&
      to.fullPath.split('/')[1] !== 'lpp' &&
      to.fullPath.split('/')[1] !== 'api'
    ) {
      next({ name: 'login' })
    } else {
      next()
    }
  }
})