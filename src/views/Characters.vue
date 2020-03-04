<template>
    <div class="overflow-y-auto">
        <div class="relative">
            <div class="absolute top-0 right-0 p-6">
                <router-link class="inline-block rounded px-3 py-2 text-white bg-gray-500" to="/home">Back</router-link>
            </div>
            <div class="h-half">
                <img class="object-fit w-full h-full" :src="`img/featured-2019-summer-bundle-purchase.jpg`" alt="">
            </div>
            <div class="absolute bottom-0 p-6">
                <h1 class="text-5xl text-white font-bold uppercase">Characters</h1>
            </div>
        </div>
    	<div class="grid grid-cols-8 gap-4 overflow-y-auto">
    	    <template v-for="({name}, index) in characters">
    	        <div class="profile-card" :key="index">
    	            <router-link class="text-xl text-white"  :to="`/character/${index}`">
    	                <figure class=" relative overflow-hidden">
    	                    <img class="w-full" :src="imgSrc(index)" :alt="name">
    	                    <figcaption class="absolute inset-0 flex items-center justify-center pointer-events-none">
    	                        {{ name }}
    	                    </figcaption>
    	                </figure>
    	            </router-link>
    	        </div>
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
    .profile-card {
        color:blue;
        a {
            &:hover {
                img {
                    transition: all 300ms;
                    transform: scale(1.2);
                }
            }
        }
        img {
            transition: all 300ms;
            /* transform: scale(1.2); */
        }
    }
</style>