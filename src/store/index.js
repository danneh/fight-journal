import Vue from 'vue'
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger'
import auth from './modules/auth'
import users from './modules/users'
import scores from './modules/scores'
import characters from './modules/characters'
import settings from './modules/settings'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
	modules: { auth, users, settings, scores, characters },
	strict: debug,
	plugins: debug ? [createLogger()] : []
})