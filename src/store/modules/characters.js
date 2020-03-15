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
	query: (state) => {
		const items = [...state.characters]

		if (state.sortBy) {
			items.sort((a, b) => String(a[state.sortBy]).localeCompare(String(b[state.sortBy])));
		}
		if (state.sortOrder === 'desc') {
			items.reverse();
		}
		if (state.sortBy && state.sortBy !== 'name') {
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
	
}

// mutations
const mutations = {
	// sortByName(state) {
	// 	state.characters.sort((a, b) => a.name.localeCompare(b.name));
	// 	state.sortBy = 'name';
	// 	state.sortOrder = 'asc';
	// },
	// sortBy(state, type) {
	// 	if (type === state.sortBy) {
	// 		state.sortOrder = state.sortOrder === 'desc' ? 'asc': 'desc';
	// 	}
	// 	else {
	// 		state.characters.sort((a, b) => {
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
