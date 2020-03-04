<template>
  <div class="h-full text-white overflow-hidden relative">
      <div class="w-full h-full flex items-center justify-center">
          <div class="z-10">
            <!-- <h1 class="text-5xl text-white font-bold uppercase">{{ hero }} <span class="lowercase">vs.</span> {{ opponent }}</h1> -->
            <div class="flex justify-center mt-6">
                <div class="w-64 bg-gray-700 flex items-center justify-center font-extrabold text-5xl px-6 py-3">
                    {{ hero }}
                </div>
                <div class="bg-gray-800 flex items-center justify-center font-extrabold text-5xl px-6 py-3">{{ match.me }}</div>
                <div class="bg-gray-800 flex items-center justify-center font-extrabold text-5xl px-6 py-3">{{ game.me }}</div>
                <div class="bg-gray-800 flex items-center justify-center font-extrabold text-5xl px-6 py-3 cursor-pointer" @click="pointHero">{{ setScore('me') }}</div>
            </div>
            <div class="flex justify-center mb-6">
                <div class="w-64 bg-gray-700 flex items-center justify-center font-extrabold text-5xl px-6 py-3">
                    {{ opponent }}
                </div>
                <div class="bg-gray-800 flex items-center justify-center font-extrabold text-5xl px-6 py-3">{{ match.opponent }}</div>
                <div class="bg-gray-800 flex items-center justify-center font-extrabold text-5xl px-6 py-3">{{ game.opponent }}</div>
                <div class="bg-gray-800 flex items-center justify-center font-extrabold text-5xl px-6 py-3 cursor-pointer" @click="pointOpponent">{{ setScore('opponent') }}</div>
            </div>

            <div v-if="match.me" class="flex justify-center">
                <button class="m-2 inline-block rounded px-3 py-2 text-white bg-gray-500">Save</button>
                <button @click="resetScore" class="m-2 inline-block rounded px-3 py-2 text-white bg-gray-500">Reset</button>
            </div>
        </div>
        <div class="absolute inset-0 flex flex-col">
            <div class="absolute top-0 right-0 p-6">
                <router-link class="inline-block rounded px-3 py-2 text-white bg-gray-500" to="../">Back</router-link>
            </div>
            <div class="h-half">
                <img class="object-cover h-full w-full" :src="`img/featured-${$route.params.me}.jpg`" alt="">

            </div>
            <div class="h-half">
                <img class="object-cover h-full w-full" :src ="`img/featured-${$route.params.opponent}.jpg`" alt="">
            </div>
        </div>
      </div>
  </div>
</template>

<script>
import Characters from '../store/modules/characters';

export default {
    data() {
        return {
            characters: Characters,
            set: {
                me: 0,
                opponent: 0
            },
            game: {
                me: 0,
                opponent: 0
            },
            match: {
                me: null,
                opponent: null
            },
        }
    },
    computed: {
        hero() {
            return this.characters[this.$route.params.me].name
        },
        opponent() {
             return this.characters[this.$route.params.opponent].name
        },
        setScore() {
            return value => this.set[value] % 2;
        }
    },
    methods: {
        setFinished() {
            return this.set.me == 2 | this.set.opponent == 2;
        },
        pointHero() {
            if (this.match.me || this.match.opponent) return
            this.set.me++
            if (this.set.me == 2) {
                this.game.me++;
                this.set.me = 0;
                this.set.opponent = 0;
            }
            if (this.game.me == 2) {
                this.match.me = 'Win';
                this.match.opponent = 'Lose';
                // this.game.me = 0;
            }
        },
        pointOpponent() {
            if (this.match.me || this.match.opponent) return
            this.set.opponent++
            if (this.set.opponent == 2) {
                this.game.opponent++;
                this.set.me = 0;
                this.set.opponent = 0;
            }
            if (this.game.opponent == 2) {
                this.match.me = 'Lose';
                this.match.opponent = 'Win';
                // this.game.opponent = 0;
            }
        },
        resetScore() {
            this.match.me = null;
            this.match.opponent = null;
            this.game.me = 0;
            this.game.opponent = 0;
            this.set.me = 0;
            this.set.opponent = 0;

        }
    }
}
</script>

<style>
    .h-half {
        height: 50%;
    }
</style>