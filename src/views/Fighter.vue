<template>
  <div class="overflow-y-auto">
        <div class="relative">
            <div class="absolute top-0 right-0 p-6">
                <router-link class="inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold" to="/stats">Back</router-link>
            </div>
            <div class="h-half">
                <img class="object-fit w-full h-full" :src="`img/featured-${$route.params.fighter}.jpg`" alt="">
            </div>
            <div class="absolute bottom-0 p-6">
                <h1 class="text-5xl text-white font-bold uppercase">Statistics</h1>
            </div>
        </div>
        <div class="text-white">
            <table class="w-full">
                <tr>
                    <th @click="sortBy('date')" class="text-left">Date
                        <font-awesome-layers v-if="getSortBy == 'date'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                    <th @click="sortBy('player')" class="text-left">Player
                        <font-awesome-layers v-if="getSortBy == 'player'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                    <th @click="sortBy('opponent')" class="text-left">Opponent
                        <font-awesome-layers v-if="getSortBy == 'opponent'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                    <th @click="sortBy('rounds')">Rounds
                        <font-awesome-layers v-if="getSortBy == 'rounds'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                    <th @click="sortBy('sets')">Sets
                        <font-awesome-layers v-if="getSortBy == 'sets'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                    <th @click="sortBy('winner')">Winner
                        <font-awesome-layers v-if="getSortBy == 'winner'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                    <th @click="sortBy('comment')" class="text-left">Comment
                        <font-awesome-layers v-if="getSortBy == 'comment'" class="fa-lg">
                            <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                            <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                            <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                        </font-awesome-layers>
                        <div v-else class="fa-lg fa-layers"></div>
                    </th>
                </tr>
                <template v-for="(score, index) in query($route.params.fighter)">
                    <tr :key="index">
                        <td>{{ moment(score.date).fromNow() }}</td>
                        <td>{{ character(score.player).name }}</td>
                        <td>{{ character(score.opponent).name }}</td>
                        <td class="text-center">{{ score.rounds.player }} : {{ score.rounds.opponent }}</td>
                        <td class="text-center">{{ score.sets.player }} : {{ score.sets.opponent }}</td>
                        <td class="text-center">{{ score.winner === 'player' ? 'Yes' : 'No' }}</td>
                        <td>{{ score.comment }}</td>
                    </tr>
                </template>
            </table>
        </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/vue-fontawesome'
import { faSquare, faSlidersH, faSort, faSortUp, faSortDown, faChartLine, faTimes } from '@fortawesome/free-solid-svg-icons'

export default {
	data() {
		return {
			showStats: false,
            statsIcon: faChartLine,
            sliderIcon: faSlidersH,
            squareIcon: faSquare,
            timesIcon: faTimes,
            sortIcon: faSort,
            sortUpIcon: faSortUp,
            sortDownIcon: faSortDown,
		}
	},
	components: {
        FontAwesomeIcon,
        FontAwesomeLayers
  	},
    created() {
        this.sortBy('date')
    },
    computed: {
        ...mapState('characters', {
            characters: state => state.characters,
        }),
        ...mapState('scores', {
            scores: state => state.scores,
        }),
        ...mapGetters({
            character: 'characters/getCharacterById',
            query: 'scores/query',
            queryFighter: 'scores/queryFighter',
            score: 'scores/getScoreByDate',
            getSortBy: 'scores/getSortBy',
            getSortOrder: 'scores/getSortOrder',
        }),

    },
    methods: {
        ...mapMutations({
            // sortByName: 'characters/sortByName',
            sortBy: 'scores/setSorting',
        }),
    }
}
</script>

<style>

</style>