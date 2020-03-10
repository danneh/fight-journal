<template>
  <div class=" overflow-y-auto">
    
    <div class="relative">
        <div class="absolute top-0 right-0 p-6">
            <router-link class="inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold" to="/characters">Back</router-link>
        </div>
        <img class="w-full" :src="`img/featured-${$route.params.player}.jpg`" alt="">
        <div class="absolute bottom-0 p-6">
            <h1 class="text-5xl text-white font-bold uppercase">{{ player($route.params.player).name }} <span class="lowercase">vs...</span></h1>
        </div>
    </div>

    <div class="characters-grid">
        <template v-for="({id, name}) in characters">
            <div class="card" :key="id">
                <router-link class="card-link" :to="`/character/${$route.params.player}/vs/${id}`">
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
import { mapState, mapGetters } from 'vuex';

export default {
    data() {
        return {
        
        }
    },
    computed: {
        ...mapState('characters', {
            characters: state => state.characters,
        }),
        ...mapGetters('characters', {
            'player': 'getCharacterById'
        }),
        sorted: function() {
            return Object.keys(this.characters);
        }
    },
    methods: {
        imgSrc(key) {
            return `img/portrait-${key.toLowerCase()}.jpg`
        },
    }

}
</script>

<style>

</style>