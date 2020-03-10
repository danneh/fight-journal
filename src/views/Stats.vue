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
                    <th class="text-left">Date</th>
                    <th class="text-left">Player</th>
                    <th class="text-left">Opponent</th>
                    <th>Rounds</th>
                    <th>Sets</th>
                    <th>Winner</th>
                    <th class="text-left">Comment</th>
                </tr>
                <template v-for="(score, index) in scores">
                    <tr :key="index">
                        <td>{{ new Date(score.date).toLocaleDateString() }}</td>
                        <td>{{ character(score.player).name }}</td>
                        <td>{{ character(score.opponent).name }}</td>
                        <td class="text-center">{{ score.rounds.player }} : {{ score.rounds.opponent }}</td>
                        <td class="text-center">{{ score.sets.player }} : {{ score.sets.opponent }}</td>
                        <td class="text-center">{{ score.winner == 'player' ? 'Yes' : 'No' }}</td>
                        <td>{{ score.comment }}</td>
                    </tr>
                </template>
            </table>
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
        }),

    },
    methods: {
        ...mapMutations({
            // sortByName: 'characters/sortByName',
            sortBy: 'scores/sortBy',
        }),
    }
}
</script>

<style>

</style>