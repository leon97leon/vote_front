import Vue from 'vue'
import Vuex from 'vuex'
import lpp from "./lpp"
import admin from "./admin"
import createLpp from "./createLpp"

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        lpp,
        admin,
        createLpp,
    },
});