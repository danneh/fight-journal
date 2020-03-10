// import { Axios as api } from '../../api'
const { ipcRenderer } = require('electron')

// initial state
const state = {
	// apiToken: ipcRenderer.sendSync('get-setting', 'apiToken') || '',
	lockedCharacter: ipcRenderer.sendSync('get-setting', 'lockedCharacter') || null,
}

// getters
const getters = {
	locked(state) {
		return state.lockedCharacter
	}
}

// actions
const actions = {
	
}

// mutations
const mutations = {
	// updateApiToken(state, token) {
	// 	state.apiToken = token
	// 	api.defaults.headers.Authorization = 'Bearer ' + token
	// },
	updateLock(state, character) {
		if (state.lockedCharacter !== character) {
			state.lockedCharacter = character
			ipcRenderer.sendSync('set-setting', {option: 'lockedCharacter', value: character})
		} else {
			state.lockedCharacter = null,
			ipcRenderer.sendSync('delete-setting', {option: 'lockedCharacter'})
		}
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}