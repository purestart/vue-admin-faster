/**
 * Created by tanyichao on 2017/3/15.
 */
import Vue from 'vue'
import Vuex from 'vuex'
// import * as actions from './actions'
// import * as getters from './getters'

import demoStore from './modules/demoStore'

import defaultStore from './modules/defaultStore'

import genStore from './modules/genStore'

// import createLogger from '../../../src/plugins/logger'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({})

store.registerModule('demo', demoStore)

store.registerModule('default',defaultStore)

store.registerModule('genStore',genStore)


export default store;
