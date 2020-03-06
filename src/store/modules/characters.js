import Characters from '../../main/characters';
// initial state
const state = {
	characters: Characters,
	sortBy: null,
	sortOrder: 'asc',
}

// getters
const getters = {
    getCharacterById: (state) => (id) => {
        return state.characters.find(character => character.id === id);
	},
}

// actions
const actions = {
	
}

// mutations
const mutations = {
	sortByName(state) {
		state.characters.sort((a, b) => a.name.localeCompare(b.name));
		state.sortBy = 'name';
		state.sortOrder = 'asc';
	},
	sortBy(state, type) {
		if (type === state.sortBy) {
			state.characters.reverse();
			state.sortOrder = state.sortOrder === 'desc' ? 'asc': 'desc';
		}
		else {
			state.characters.sort((a, b) => {
				return String(a[type]).localeCompare(String(b[type]))
			});
			state.sortBy = type;
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
