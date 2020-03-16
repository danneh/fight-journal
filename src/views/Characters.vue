<template>
    <div class="overflow-y-auto">
        <div class="relative">
            <div class="absolute top-0 right-0 p-6">
                <router-link class="inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold" to="/home">Back</router-link>
            </div>
            <div class="h-half">
                <img class="object-fit w-full h-full" :src="`img/featured-2019-summer-bundle-purchase.jpg`" alt="">
            </div>
            <div class="absolute bottom-0 p-6">
                <h1 class="text-5xl text-white font-bold uppercase">Characters</h1>
            </div>
        </div>
        <div class="sorter">
            <button @click="sortBy()">Release
                <font-awesome-layers v-if="getSortBy == null" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('name')">Name
                <font-awesome-layers v-if="getSortBy == 'name'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('slogan')">Slogan
                <font-awesome-layers v-if="getSortBy == 'slogan'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('power')">Power
                <font-awesome-layers v-if="getSortBy == 'power'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('health')">Health
                <font-awesome-layers v-if="getSortBy == 'health'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('mobility')">Mobility
                <font-awesome-layers v-if="getSortBy == 'mobility'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('technique')">Technique
                <font-awesome-layers v-if="getSortBy == 'technique'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="sortBy('range')">Range
                <font-awesome-layers v-if="getSortBy == 'range'" class="fa-lg">
                    <font-awesome-icon :icon="sortIcon" class="text-gray-700" /> 
                    <font-awesome-icon v-if="getSortOrder == 'asc'" :icon="sortUpIcon" class="text-gray-500" />
                    <font-awesome-icon v-if="getSortOrder == 'desc'" :icon="sortDownIcon" class="text-gray-500" />
                </font-awesome-layers>
                <div v-else class="fa-lg fa-layers"></div>
            </button>
            <button @click="showStats = !showStats" class="focus:outline-none">
                <font-awesome-layers class="fa-2x">
                    <font-awesome-icon :icon="squareIcon" class="bg-gray-900" /> 
                    <font-awesome-icon :icon="sliderIcon" class="text-gray-500" transform="shrink-6" />
                    <font-awesome-icon v-if="showStats" :icon="sliderIcon" style="color: #f80" transform="shrink-6" />
                    <font-awesome-icon v-if="showStats" :icon="timesIcon" class="opacity-0 hover:opacity-100 text-red-500" transform="shrink-4" />
                </font-awesome-layers>
            </button>
        </div>
        <div class="characters-grid">
            <template v-for="({id, name, slogan, power, health, mobility, technique, range }) in query">
                <div class="card" :key="id">
                    <router-link class="card-link" :to="`/character/${id}`">
                        <figure class="card-image">
                            <img :src="imgSrc(id)" :alt="name">
                            <figcaption class="card-caption">
                                <div>{{ name }}</div>
                                <div v-if="showStats" class="text-xs text-gray-400 px-3 whitespace-normal text-center leading-tight pb-8">{{ slogan }}</div>
                            </figcaption>
                            <!-- <div class="text-xs uppercase">Power</div> -->
                            <div v-if="showStats" class="card-stats">
                                <div v-for="(stat, index) in [power, health, mobility, technique, range]" :key="index">
                                    <div class="text-xs uppercase font-bold">{{ ['Power', 'Health', 'Mobility', 'Technique', 'Range'][index] }}</div>
                                    <div class="card-statbars">
                                        <template v-for="n in 5">
                                            <div :key="n" v-if="stat >= n" class="bar active"></div>
                                            <div :key="n" v-else class="bar"></div>
                                        </template>
                                    </div>
                                </div>
                            </div>
                        </figure>
                    </router-link>
                </div>
            </template>
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
        ...mapState({
            characters: state => state.characters.characters,
        }),
        ...mapGetters({
            query: 'characters/query',
            getSortBy: 'characters/getSortBy',
            getSortOrder: 'characters/getSortOrder',
            // getScore: 'scores/getScore',
        }),
        getCharacters() {
            return this.query(this.sorting);
        },
    },
    methods: {
        ...mapMutations({
            sortBy: 'characters/setSorting',
        }),
        imgSrc(key) {
            return `img/portrait-${key.toLowerCase()}.jpg`
        },
    }

}
</script>

<style>
    .characters-grid {
        @apply grid grid-cols-8 gap-0;

        .card {
            &-link {
                @apply text-xl text-white;

                &:hover {
                    img {
                        transform: scale(1.2); 
                    }
                    .card-caption {
                        @apply flex flex-col;
                        background-color: rgba(0, 0, 0, 0.5);
                    }
                }
            }

            &-image {
                @apply relative overflow-hidden;

                img {
                    @apply block;
                    transition: all 300ms;
                }
            }

            &-caption {
                @apply hidden absolute inset-0 items-center justify-center pointer-events-none font-bold whitespace-no-wrap;
            }

            &-stats {
                @apply p-2;
            }

            &-statbars {
                @apply flex justify-between overflow-hidden;
                margin-bottom: 4px;

                
                .bar {
                    width: 18%;
                    height: 4px;
                    background: #840;

                    &.active {
                        background: #f80;
                    }
                }
            }    
        }
    }
    .sorter {
        @apply flex justify-evenly text-white py-1;

        button {
            @apply flex items-center text-xs font-bold uppercase;

            &:focus {
                @apply outline-none
            }
        }
    }
</style>