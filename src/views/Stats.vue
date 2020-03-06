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
        <div class="text-white">
            <table class="w-full">
                <tr>
                    <th>Date</th>
                    <th>Player</th>
                    <th>Opponent</th>
                    <th>Rounds</th>
                    <th>Sets</th>
                    <th>Winner</th>
                    <th>Comment</th>
                </tr>
            <template v-for="(score, index) in scores">
                <tr :key="index">
                    <td>{{ new Date(score.date).toLocaleDateString() }}</td>
                    <td>{{ score.player }}</td>
                    <td>{{ score.opponent }}</td>
                    <td>{{ score.rounds.player }} : {{ score.rounds.opponent }}</td>
                    <td>{{ score.sets.player }} : {{ score.sets.opponent }}</td>
                    <td>{{ score.winner }}</td>
                    <td>{{ score.comment }}</td>
                </tr>
            </template>
            </table>
        </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
    data() {
        return {
        }
    },
    computed: {
        ...mapState('characters', {
            characters: state => state.characters,
        }),
        ...mapState('scores', {
            scores: state => state.scores,
            newScore: state => state.newScore,
            isFinished: state => state.isFinished,
        }),
        ...mapGetters({
            // map `this.doneCount` to `this.$store.getters.doneTodosCount`
            character: 'characters/getCharacterById',
        }),

    },
    methods: {
        getScore(fighter) {
            return this.score.round[fighter] % 2;
        },
    }
}
</script>

<style>

</style>