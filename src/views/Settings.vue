<template>
	<div class="p-4 max-w-5xl flex-grow">
		<h1 class="text-black font-bold mb-4 text-white">Settings</h1>
		<!-- <form
			@submit.prevent="verifyUserApi()"
			class="rounded-lg bg-gray-100 w-full p-6">
			<label
				for="apiKey"
				class="block"><small class="font-bold uppercase">API Key</small></label>
			<div class="flex">
				<input
					@input="updateApiToken"
					:value="apiToken"
					:disabled="verifying"
					:class="{ 'bg-gray-200 text-gray-400 italic': verifying }"
					type="text"
					class="flex-grow border border-r-0 focus:border-gray-500 shadow-none m-0 py-2 px-3 block focus:outline-none appearance-none leading-normal">
				<button
					@click="verifyUserApi()"
					class="w-24 bg-gray-600 border border-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r inline-flex justify-center items-center focus:outline-none">
						<font-awesome-icon
							v-if="verifying"
							:icon="loadingIcon"
							spin
							class="spin"
						/>
						<span v-else>Verify</span>
				</button>
			</div>
			<p v-if="maybeTokenError"><small class="text-red-500">This API token needs to be vefified.</small></p>
			<p v-else><small v-if="apiToken.length" class="text-green-700">API token is valid.</small></p>
		</form> -->
		<form @submit.prevent="handleLock" class="rounded-lg bg-gray-100 w-full p-6 mb-8">
			<label
				class="block"><small class="font-bold uppercase">Lock player character</small>
			</label>
			<div class="flex">
				<select
					v-model="lockSelected"
					:class="{ 
						'bg-gray-200 text-gray-400 italic': locking,
						'rounded-r-none border-r-0' : lockSelected,
					}"
					type="text"
					class="flex-grow border focus:border-gray-500 shadow-none m-0 py-2 px-3 block focus:outline-none appearance-none leading-normal">
					<option disabled value="null">Select fighter</option>
					<option v-for="({id, name}, index) in characters" :key="index" :value="id">{{ name }}</option>
				</select>
				<button
					v-if="lockSelected"
					type="submit"
					class="w-24 bg-gray-600 border border-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded-r inline-flex justify-center items-center focus:outline-none">
						<font-awesome-icon
							v-if="locking"
							:icon="loadingIcon"
							spin
							class="spin"
						/>
						<span v-else>
							{{ lockSelected === lockedCharacter ? 'Unlock' : 'Lock' }}
						</span>
				</button>
			</div>
		</form>

		<form @submit.prevent="handleExport" class="rounded-lg bg-gray-100 w-full p-6 mb-8">
			<label
				class="block"><small class="font-bold uppercase">Export Scores to file</small>
			</label>
			<div class="flex">
				<button
					type="submit"
					class="w-24 bg-gray-600 border border-gray-500 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded inline-flex justify-center items-center focus:outline-none">
						<font-awesome-icon
							v-if="exporting"
							:icon="loadingIcon"
							spin
							class="spin"
						/>
						<span v-else>Export</span>
				</button>
			</div>
		</form>
	</div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
const { ipcRenderer } = require('electron')

export default {
	data() {
		return {
			loadingIcon: faSpinner,
			locking: false,
			exporting: false,
			lockSelected: null,
		}
	},
	created() {
		this.sortBy('name');
		this.lockSelected = this.lockedCharacter;
	},
	computed: {
        ...mapState({
        //     characters: state => state.characters.characters, 
			lockedCharacter: state => state.settings.lockedCharacter,
			
		}),
		...mapGetters({
			characters: 'characters/query',
        }),
		// maybeTokenError() {
		// 	return this.apiToken.length && !this.hasValidApiToken
		// },
		...mapState({
			// hasValidApiToken: state => state.auth.user.hasValidApiToken,
			// apiToken: state => state.settings.apiToken
		})
	},
	methods: {
		...mapActions('scores', {
			exportScores: 'export',
		}),
		...mapMutations({
            sortBy: 'characters/setSorting',
        }),
		updateCharacter(event) {

		},
		handleLock(event) {
			this.locking = true;
			
			this.$store.commit('settings/updateLock', this.lockSelected);
			let status = this.lockedCharacter === this.lockSelected ? 'locked' : 'unlocked';
			this.notifySuccess('lock-character', `Success. Character ${status}.`, true);
			
			this.locking = false;
		},
		// updateApiToken(event) {
		// 	this.$store.commit('settings/updateApiToken', event.target.value)
		// },
		// verifyUserApi() {
		// 	this.verifying = true
		// 	// Update the stored data with the new token
		// 	ipcRenderer.sendSync('set-setting', {option: 'apiToken', value: this.apiToken})
		// 	// Getting the user data will verify it
		// 	this.$store.dispatch('users/getCurrentUser').then(response => {
		// 		if (401 === response.status) {
		// 			this.notifyError('invalid-token', 'Error : ' + response.data.message, true)
		// 		}
				
		// 		if (200 === response.status) {
		// 			this.notifySuccess('token-verified', 'Success. Logged in.', true)
		// 		}

		// 		this.verifying = false

		// 	})
		// },
		async handleExport() {

			this.exporting = true;
			const result = await this.exportScores();
			
			if ( result.message === 'success') {
				this.notifySuccess('export-success', 'Success. File Exported.', true);
			}
			if (result.message === 'failed') {
				this.notifyError('export-success', 'Failed. Something went wrong.', true);
			}
			this.exporting = false;
		}
		
	},
	components: {
    	FontAwesomeIcon
  	}
}
</script>