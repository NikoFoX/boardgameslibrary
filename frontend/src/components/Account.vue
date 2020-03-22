<template>
	<v-container grid-list-xs>
		<h2>User: {{ userData.fullName }}</h2>
	</v-container>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
	name: 'Account',
	data: () => ({
		userData: {}
	}),
	computed: {
		...mapGetters(['user'])
	},
	mounted() {
		this.$set(
			this.userData,
			'fullName',
			this.user.name + ' ' + this.user.lastName
		)
	}
}
</script>

<style lang="scss" scoped></style>
