import { ipcRenderer } from 'electron';
// initial state
const state = {
	scores: ipcRenderer.sendSync('get-setting', 'scores') || [],

}

// getters
const getters = {
}

// actions
const actions = {
	async export(context) {
		const { remote } = require('electron');
		const { dialog } = remote;
		const { copyFile } = require('fs');
		const { promisify } = require("util");
		const promisCopy = promisify(copyFile);

		const { filePath } = await dialog.showSaveDialog({
			buttonLabel: 'Save export',
			defaultPath: `fight-journal-${Date.now()}.json`
		});

		if (filePath) {
			let copy = await promisCopy(ipcRenderer.sendSync('get-store-path'), filePath)
				.then(data => {return { message: 'success'}})
				.catch(err => {return { message: 'failed', error: error}});

			return new Promise ((resolve, reject) => {
				if (copy.error) return reject(copy)
				resolve(copy);
			})
		}
	}
}

// mutations
const mutations = {
	saveScore(state, payload) {
		state.scores.push(payload);
		ipcRenderer.sendSync('set-setting', {option: 'scores', value: state.scores})
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
