<template>
	<div class="bg-gray-700 h-full pt-12 pb-4 px-2 flex-shrink-0" style="width:76px;-webkit-app-region:drag">
		<div class="h-full flex items-center justify-between flex-col text-center text-gray-400">
			<div>
				<div>
					<router-link to="/home"><font-awesome-icon size="lg" :icon="dashboardIcon" /></router-link>
				</div>
				<div class="mt-2">
					<router-link to="/characters"><font-awesome-icon size="lg" :icon="userIcon" /></router-link>
				</div>
			</div>
			<div>
				<router-link to="/settings"><font-awesome-icon size="lg" :icon="settingsIcon" /></router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCog, faThLarge, faUser } from '@fortawesome/free-solid-svg-icons'
export default {
	data() {
		return {
			body: 'I am a notifications.',
			settingsIcon: faCog,
			dashboardIcon: faThLarge,
			userIcon: faUser,
		}
	},
	components: {
    	FontAwesomeIcon
  	}
}
</script>