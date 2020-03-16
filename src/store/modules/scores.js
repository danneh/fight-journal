import { ipcRenderer } from 'electron';
// initial state
const state = {
	scores: ipcRenderer.sendSync('get-setting', 'scores') || [],
	sortBy: 'lastPlayed',
	sortOrder: 'asc',

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

	queryStats: (state) => {
		let items = [...state.scores]
		
		items = Object.values(items.reduce((acc, obj) => {
			let key = obj['player']
			if (!acc[key]) {
				acc[key] = {
					fighter: obj.player,
					total: 1,
					wins: obj.winner === 'player' ? 1 : 0,
					winrate: obj.winner === 'player' ? 100 : 0,
					lastPlayed: obj.date,
				}
			} else {
				acc[key].total ++
				acc[key].wins += obj.winner === 'player' ? 1 : 0
				acc[key].lastPlayed = acc[key].lastPlayed > obj.date ? acc[key].lastPlayed : obj.date
				acc[key].winrate = Math.round(acc[key].wins / acc[key].total * 100)
			}
			return acc
		}, {}))

		if (state.sortBy) {
			
			if (['fighter'].includes(state.sortBy)) {
				items.sort((a, b) => a[state.sortBy].localeCompare(b[state.sortBy]));
			}
			if (['total', 'wins', 'winrate', 'lastPlayed'].includes(state.sortBy)) {
				items.sort((a, b) => {
					return a[state.sortBy] - b[state.sortBy]
				})
				items.reverse()
			}
		}

		if (state.sortOrder === 'desc') {
			items.reverse();
		}

		return items;
	},

	getSortBy: (state) => {
		return state.sortBy;
	},

	getSortOrder: (state) => {
		return state.sortOrder;
	},

	getTotal: (state, getters) => {
		return getters.queryStats.reduce((prev, curr) => prev > curr.total ? prev : curr.total, 0)
		 
	},
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
	// sortBy(state, type) {
	// 	if (type === state.sortBy) {
	// 		state.scores.reverse();
	// 		state.sortOrder = state.sortOrder === 'desc' ? 'asc': 'desc';
	// 	}
	// 	else {
	// 		state.scores.sort((a, b) => {
	// 			return String(a[type]).localeCompare(String(b[type]))
	// 		});
	// 		state.sortBy = type;
	// 	}
	// },
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
