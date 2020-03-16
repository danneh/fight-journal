<template>
  <div class="overflow-y-auto">
        <div class="relative">
            <div class="absolute top-0 right-0 p-6">
                <router-link class="inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold" to="/home">Back</router-link>
            </div>
            <div class="h-half">
                <img class="object-fit w-full h-full" :src="`img/featured-how-to-play.jpg`" alt="">
            </div>
            <div class="absolute bottom-0 p-6">
                <h1 class="text-5xl text-white font-bold uppercase">Statistics</h1>
            </div>
        </div>
        <div class="stats-sorter">
            <button @click="sortBy('lastPlayed')">Last Played
                <font-awesome-layers v-if="getSortBy == 'lastPlayed'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('fighter')">Fighter
                <font-awesome-layers v-if="getSortBy == 'fighter'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('total')">Matches
                <font-awesome-layers v-if="getSortBy == 'total'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('winrate')">Winrate
                <font-awesome-layers v-if="getSortBy == 'winrate'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <!-- <button @click="showStats = !showStats" class="focus:outline-none">
                <font-awesome-layers class="fa-2x">
                    <font-awesome-icon :icon="squareIcon" class="bg-gray-900" /> 
                    <font-awesome-icon :icon="sliderIcon" class="text-gray-500" transform="shrink-6" />
                    <font-awesome-icon v-if="showStats" :icon="sliderIcon" style="color: #f80" transform="shrink-6" />
                    <font-awesome-icon v-if="showStats" :icon="timesIcon" class="opacity-0 hover:opacity-100 text-red-500" transform="shrink-4" />
                </font-awesome-layers>
            </button> -->
        </div>
        <div class="fighter-stats text-white max-w-5xl mx-auto overflow-hidden">
            <div class="flex justify-between">
                <div class="w-1/3">
                    <h3 class="pl-6 p-3 bg-gray-700 uppercase text-sm font-bold">Info</h3>
                </div>
                <div class="w-1/3">
                    <h3 class="p-3 bg-gray-700 uppercase text-sm font-bold">Matches</h3>
                </div>
                <div class="w-1/3">
                    <h3 class="p-3  pr-6 bg-gray-700 uppercase text-sm font-bold">Winrate</h3>
                </div>
            </div>
            <div class="flex justify-between -mx-3 mb-8 last:mb-0 p-6" v-for="({fighter, total, wins, winrate, lastPlayed}, index) in query" :key="index">
                <router-link class="w-1/3 px-3 flex" :to="`/stats/${fighter}`">
                    <img class="w-24 rounded border-2 border-gray-600" :src="imgSrc(fighter)">
                    <div class="ml-3">
                        <div><h2 class="text-xl font-bold mb-2">{{ character(fighter).name }}</h2></div>
                        <div class="text-sm text-gray-300">{{ moment(lastPlayed).fromNow() }}</div>
                    </div>
                </router-link>
                <div class="w-1/3 px-3">
                    <div>{{ total }}</div>
                    <div class="bar">
                        <div class="bar-segment" :style="{width: total / getTotal * 100 +'%'}"></div>
                    </div>
                </div>
                <div class="w-1/3 px-3">
                    <div>{{ winrate }} %</div>
                    <div class="bar --winrate">
                        <div class="bar-segment" :style="{width: winrate +'%'}"></div>
                    </div>
                </div>
                <!-- <div v-for="(score, index) in scores" :key="index">{{ score.date }}</div> -->
            </div>
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
    computed: {
        ...mapGetters({
            character: 'characters/getCharacterById',
            query: 'scores/queryStats',
            score: 'scores/getScoreByDate',
            getSortBy: 'scores/getSortBy',
            getSortOrder: 'scores/getSortOrder',
            getTotal: 'scores/getTotal',
        }),

    },
    methods: {
        ...mapMutations({
            // sortByName: 'characters/sortByName',
            sortBy: 'scores/setSorting',
        }),
        imgSrc(key) {
            return `img/portrait-${key.toLowerCase()}.jpg`
        },
    }
}
</script>

<style>
    .stats-sorter {
        @apply flex justify-evenly text-white py-1;

        button {
            @apply flex items-center text-xs font-bold uppercase;

            &:focus {
                @apply outline-none
            }
        }
    }
    .fighter-stats {
        @apply bg-gray-800 rounded;
        .bar {
            @apply bg-gray-900 w-full;
            height: 6px;

            &-segment {
                height: 100%;
                background: #F80;  
            }

            &.--winrate {
                background: #f08080;

                .bar-segment {
                    background: #8fbc8f;
                }
            }
        }
    }
</style>