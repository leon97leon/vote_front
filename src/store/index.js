import Vue from 'vue'
import Vuex from 'vuex'
import lpp from "./lpp"
import admin from "./admin"
import createLpp from "./createLpp"
import quiz from "./quiz"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lpp,
        admin,
        createLpp,
        quiz,
    },
});