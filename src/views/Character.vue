<template>
  <div class=" overflow-y-auto">
    
    <div class="relative">
        <div class="absolute top-0 right-0 p-6">
            <router-link class="inline-block rounded px-3 py-2 text-white bg-gray-500" to="/characters">Back</router-link>
        </div>
        <img :src="`img/featured-${$route.params.me}.jpg`" alt="">
        <div class="absolute bottom-0 p-6">
            <h1 class="text-5xl text-white font-bold uppercase">{{ characters[$route.params.me].name }} <span class="lowercase">vs...</span></h1>
        </div>
    </div>
    <div class="grid grid-cols-8 gap-4">
        <template v-for="({name}, index) in characters">
            <figure :key="index" class="relative">
                <img class="transform hover:scale-75" :src="imgSrc(index)" :alt="name">
                <figcaption class="absolute inset-0 flex items-center justify-center">
                    <router-link class="text-xl text-white" :key="index" :to="`/character/${$route.params.me}/vs/${index}`">
                        {{ name }} 
                    </router-link>
                </figcaption>
            </figure>
        </template>
    </div>
  </div>
</template>

<script>
import Characters from '../store/modules/characters';

export default {
    data() {
        return {
            characters: Characters,
            // selected: this.characters[$route.params.me],
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