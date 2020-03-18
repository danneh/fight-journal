<template>
      <div class="relative h-full flex items-center justify-center">
          <div class="scoreboard">
            <div class="scoreboard-header">
                <div class="scoreboard-name --small"></div>
                <div class="scoreboard-counter --small">round</div>
                <div class="scoreboard-counter --small">set</div>
                <div class="scoreboard-result --small">match</div>
            </div>
            <div class="scoreboard-player">
                <div class="scoreboard-name border-b-2 border-gray-800 ">{{ character($route.params.player).name }}</div>
                <div class="scoreboard-counter cursor-pointer border-b-2 border-gray-700" @click.left="point('player')">{{ getScore('player') }}</div>
                <div class="scoreboard-counter border-b-2 border-gray-700">{{ score.set.player }}</div>
                <div class="scoreboard-result border-b-2 border-gray-700">{{ score.match.player }}</div>
            </div>
            <div class="scoreboard-opponent">
                <div class="scoreboard-name">{{ character($route.params.opponent).name }}</div>
                <div class="scoreboard-counter cursor-pointer" @click.left="point('opponent')">{{ getScore('opponent') }}</div>
                <div class="scoreboard-counter">{{ score.set.opponent }}</div>
                <div class="scoreboard-result">{{ score.match.opponent }}</div>
            </div>
            <div class="scoreboard-finished">
                <input class="w-full px-3 py-2 border-2 border-gray-700 bg-gray-800 text-white" type="text" placeholder="Give a quick comment on the fight..." v-model="comment" />
                <div class="scoreboard-controlls">
                    <button @click="handleSave" class="m-2 inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold">Save</button>
                    <button @click="handleReset" class="m-2 inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold">Reset</button>
                </div>
            </div>
        </div>
        <div class="absolute inset-0 flex flex-col">
            <div class="absolute top-0 right-0 p-6">
                <router-link class="inline-block rounded border-2 border-gray-700 px-3 py-2 text-gray-400 bg-gray-800 uppercase text-sm font-bold" to="../">Back</router-link>
            </div>
            <div class="h-half">
                <img class="object-cover h-full w-full" :src="`img/featured-${$route.params.player}.jpg`" alt="">
            </div>
            <div class="h-half">
                <img class="object-cover h-full w-full" :src ="`img/featured-${$route.params.opponent}.jpg`" alt="">
            </div>
        </div>
      </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';

export default {
    data() {
        return {
            score: {
                current: {
                    player: 0,
                    opponent: 0,
                },
                round: {
                    player: 0,
                    opponent: 0
                },
                set: {
                    player: 0,
                    opponent: 0
                },
                match: {
                    player: null,
                    opponent: null
                },
                winner: null,
            },
            comment: '',
        }
    },
    computed: {
        ...mapState('characters', {
            characters: state => state.characters,
        }),
        ...mapState('scores', {
            scores: state => state.scores,
            // newScore: state => state.newScore,
            // isFinished: state => state.isFinished,
        }),
        ...mapGetters({
            character: 'characters/getCharacterById',
            // getScore: 'scores/getScore',
        }),
    },
    methods: {
        getScore(fighter) {
            return this.score.current[fighter];
        },
        point(fighter) {
            this.score.current[fighter]++
            this.score.round[fighter]++

            if (this.score.current[fighter] % 2 == 0) {
                this.score.set[fighter]++;
                this.score.current['player'] = 0;
                this.score.current['opponent'] = 0;
            }

            if (this.score.set[fighter] !== 0 && this.score.current[fighter] % 2 == 0 ) {
                if (this.score.set.player == this.score.set.opponent) {
                    this.score.match.player = 'Draw';
                    this.score.match.opponent = 'Draw';
                    this.score.winner = null;
                }
                else if (this.score.set.player > this.score.set.opponent) {
                    this.score.match.player = 'Win';
                    this.score.match.opponent = 'Lose';
                    this.score.winner = 'player'; 
                }
                else if (this.score.set.player < this.score.set.opponent) {
                    this.score.match.player = 'Lose';
                    this.score.match.opponent = 'Win';
                    this.score.winner = 'opponent';
                }
            } else {
                this.score.match.player = '';
                this.score.match.opponent = '';
                this.score.winner = null;
            }
        },
        resetScore() {
            this.score.match.player = null;
            this.score.match.opponent = null;
            this.score.current.player = 0;
            this.score.current.opponent = 0;
            this.score.round.player = 0;
            this.score.round.opponent = 0;
            this.score.set.player = 0;
            this.score.set.opponent = 0; 
            this.score.winner = null;
            this.comment = '';
        },
        ...mapMutations('scores', {
            saveScore: 'saveScore',
        }),
        handleSave() {
            let score = {
                date: Date.now(),
                player: this.$route.params.player,
                opponent: this.$route.params.opponent,
                winner: this.score.winner,
                rounds: {
                    player: this.score.round.player,
                    opponent: this.score.round.opponent,
                },
                sets: {
                    player: this.score.set.player,
                    opponent: this.score.set.opponent,
                },
                comment: this.comment,
            };
            this.saveScore(score);
            this.resetScore();
            this.notifySuccess('saved-score', `Success. Score saved.`, true);
        },
        handleReset() {
            this.resetScore();
        },
    }
}
</script>

<style scoped>
    .h-half {
        height: 50%;
    }
    .scoreboard {
        @apply select-none text-white z-10;

        &-header {
            @apply uppercase text-xs;
        }

        &-player {
            @apply rounded-t;
        }

        &-opponent {
            @apply rounded-b;
            margin-bottom: 27px;
        }

        &-header,
        &-player,
        &-opponent {
            @apply  flex justify-center overflow-hidden;
        }

        &-name {
            @apply w-64 bg-gray-700 flex items-center justify-center font-extrabold text-5xl px-6 py-3;

            &.--small {
                @apply bg-transparent text-xs py-1 uppercase;
            }
        }

        &-result {
            @apply bg-gray-900;
            width: 160px;
        }

        &-counter {
            @apply  bg-gray-800;
            width: 80px;
        }

        &-counter,
        &-result {
            @apply flex items-center justify-center font-extrabold text-5xl px-6 py-3;

            &.--small {
                @apply bg-transparent text-xs py-1 uppercase;
            }
        }

        &-finished {
            @apply absolute;
            left: 50%;
            transform: translateX(-50%);
            input {
                @apply rounded;
                width: 576px;
            }
        }
        &-controlls {
            @apply flex justify-center;
            margin-top: 20px;
            
        }
    }
</style>