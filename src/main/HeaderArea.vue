<template>
	<div class="bg-gray-800 text-white w-full flex justify-between items-center h-12 flex-shrink-0" style="-webkit-app-region: drag">
		<div class="flex items-center py-1 px-4 font-bold uppercase tracking-widest"  style="-webkit-user-select: none">
			<img class="block w-10 mr-4" src="img/sfvce-logo.png" alt="Street Fighter V"> <span>Fight Journal</span>
		</div>
		<!-- <div class="h-full">
			<template v-if="user">
				<button
					@click="openUserMenu()"
					class="h-full flex items-center hover:bg-gray-600 focus:outline-none text-gray-600 hover:text-gray-300 pl-2 pr-6 italic transition">
					<img
						v-if="user.photo_url.length"
						:src="user.photo_url"
						class="inline-block w-8 h-8 mr-2 rounded-full border-2"
					/><div class="flex flex-col justify-betweeen items-start py-1 leading-none">
						<span>{{ user.name }}</span>
						<span><small>Current project name</small></span>
					</div>
				</button>
			</template>
			<template v-else>
				<span
					class="h-full flex items-center text-gray-500 pl-2 pr-6 italic">
					<font-awesome-icon
						:icon="noUserIcon"
						class="mr-2"
						size="lg"
					/>Not logged in
				</span>
			</template>
		</div> -->
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { mapState } from 'vuex'
export default {
	data() {
		return {
			noUserIcon: faUser,
			menuOpen: false
		}
	},
	computed: mapState({
		// The logged in user (auth) may be able to switch the current user (i.e. admins)
		user: state => state.users.current,
		auth: state => state.auth.user
	}),
	mounted() {
		
	},
	methods: {
		openUserMenu() {
			console.log('hi')
			this.menuOpen = true
		}
	},
	components: {
    	FontAwesomeIcon
  	}
}
</script>