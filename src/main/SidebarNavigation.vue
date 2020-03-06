<template>
	<div class="navbar" style="-webkit-app-region:drag">
		<div class="navbar-nav">
			<div class="navbar-item">
				<router-link class="navbar-link" to="/home"><font-awesome-icon  size="5x" :icon="dashboardIcon" />
					<div class="navbar-link-text">Dashboard</div>
				</router-link>
			</div>
			<div class="navbar-item">
				<router-link class="navbar-link" to="/characters"><font-awesome-icon size="5x" :icon="usersIcon" />
					<div class="navbar-link-text">Characters</div>
				</router-link>
			</div>
			<div class="navbar-item">
				<router-link class="navbar-link" to="/stats"><font-awesome-icon size="5x" :icon="statsIcon" />
					<div class="navbar-link-text">Statistics</div>
				</router-link>
			</div>
			<div class="navbar-item">
				<router-link class="navbar-link" to="/settings"><font-awesome-icon  size="5x" :icon="settingsIcon" />
					<div class="navbar-link-text">Settings</div>
				</router-link>
			</div>
		</div>
	</div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCog, faThLarge, faUsers, faChartLine } from '@fortawesome/free-solid-svg-icons'
export default {
	data() {
		return {
			body: 'I am a notifications.',
			settingsIcon: faCog,
			dashboardIcon: faThLarge,
			usersIcon: faUsers,
			statsIcon: faChartLine,
		}
	},
	components: {
    	FontAwesomeIcon
  	}
}
</script>

<style scoped>
.navbar {
	@apply fixed h-screen w-20 pt-12 z-50;
	transition: width 200ms ease;

	&:hover {
		@apply w-64;

		.navbar-link-text {
			@apply block;
		}
	}

	&-nav {
		@apply flex flex-col h-full items-center bg-gray-900 text-gray-400;
	}

	&-item {
		@apply w-full;

		&:last-child {
			@apply mt-auto;
		}

	}

	&-link {
		@apply flex items-center h-20;
		transition: 600ms;

		&-text {
			@apply hidden ml-4;
		}

		svg {
			max-width: 2rem;
			margin: 0 1.5rem;
		}

		&:hover {
			@apply bg-gray-800 text-white;
		}
	}
}

</style>