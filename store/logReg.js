export const state = () => ({
	vldNewEmail: null,
	auth_user: {},
})

export const mutations = {
	changVldEmail (state,email) { state.vldNewEmail = email },
	myAuthUser (state,user) { state.auth_user = user },
}