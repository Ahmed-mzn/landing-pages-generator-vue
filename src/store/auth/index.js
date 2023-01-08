export default {
    namespaced: true,
    state: {
        isAuthenticated: false,
        token: '',
        user: {
            id: 0,
            email: '',
            full_name: '',
            phone_number: ''
        },
    },
    getters: {
    },
    mutations: {
        initializeStore(state) {
            if (localStorage.getItem('token')) {
                state.token = localStorage.getItem('token')
                state.isAuthenticated = true
                state.user.email = localStorage.getItem('email')
                state.user.full_name = localStorage.getItem('fullname')
                state.user.id = localStorage.getItem('userid')
                state.user.phone_number = localStorage.getItem('phonenumber')
            } else {
                state.token = ''
                state.isAuthenticated = false
                state.user.id = 0
                state.user.email = ''
                state.user.full_name = ''
                state.user.phone_number = ''
            }
        },
        setToken(state, token) {
            state.token = token
            state.isAuthenticated = true
        },
        removeToken(state) {
            state.token = ''
            state.isAuthenticated = false
        },
        setUser(state, user) {
            state.user = user
        },
    },
    actions: {},
}