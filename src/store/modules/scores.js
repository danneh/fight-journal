import { ipcRenderer } from 'electron';
// initial state
const state = {
	scores: ipcRenderer.sendSync('get-setting', 'scores') || [],
	sortBy: 'date',
	sortOrder: 'desc',

}

// getters
const getters = {
	getScoreByDate: (state) => (date) => {
        return state.scores.find(score => score.date === date);
	},
	query: (state) => (fighter) => {
		let items = [...state.scores]

		if (fighter) {
			items = items.filter(score => score.player === fighter);
		}

		if (state.sortBy) {
			items.sort((a, b) => String(a[state.sortBy]).localeCompare(String(b[state.sortBy])));
		}
		if (state.sortOrder === 'desc') {
			items.reverse();
		}
		if (state.sortBy && !['player', 'opponent', 'comment'].includes(state.sortBy)) {
			items.reverse();
		}
		return items;
	},

	getSortBy: (state) => {
		return state.sortBy;
	},
	getSortOrder: (state) => {
		return state.sortOrder;
	}
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
	sortBy(state, type) {
		if (type === state.sortBy) {
			state.scores.reverse();
			state.sortOrder = state.sortOrder === 'desc' ? 'asc': 'desc';
		}
		else {
			state.scores.sort((a, b) => {
				return String(a[type]).localeCompare(String(b[type]))
			});
			state.sortBy = type;
		}
	},
	setSorting(state, field) {
		if (state.sortBy == field) {
			state.sortOrder = state.sortOrder == 'asc' ? 'desc': 'asc';
		} else {
			state.sortOrder = 'asc';
			state.sortBy = field || null;
		}
	}
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
}
