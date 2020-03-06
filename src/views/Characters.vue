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
        <div class="sorter flex justify-evenly text-white">
            <button @click="sortBy('name')">Name</button>
            <button @click="sortBy('slogan')">Slogan</button>
            <button @click="sortBy('power')">Power</button>
            <button @click="sortBy('health')">Health</button>
            <button @click="sortBy('mobility')">Mobility</button>
            <button @click="sortBy('technique')">Technique</button>
            <button @click="sortBy('range')">Range</button>
        </div>
        <div class="characters-grid">
            <template v-for="({id, name}) in characters">
                <div class="card" :key="id">
                    <router-link class="card-link" :to="`/character/${id}`">
                        <figure class="card-image">
                            <img :src="imgSrc(id)" :alt="name">
                            <figcaption class="card-caption">{{ name }}</figcaption>
                        </figure>
                    </router-link>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
    data() {
        return {

        }
    },
    computed: {
        ...mapState({
            characters: state => state.characters.characters,
        }),
    },
    methods: {
        ...mapMutations({
            sortByName: 'characters/sortByName',
            sortBy: 'characters/sortBy',
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
                        @apply flex;
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
        }
    }
    .sorter {
        button {
            @apply text-xs font-bold uppercase;
        }
    }
</style>