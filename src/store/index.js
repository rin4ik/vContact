import {createStore} from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export default createStore({
    state() {
        return {
            contacts: [{name: 'Mirakhmad'}, {name: "leyla"}]
        }
    },
    getters: {
        contacts (state) {
            return state.contacts
        },
    },
    mutations: {
        REMOVE_CONTACT(state, contact) {
            state.contacts.push(contact)
        },
        UPDATE_CONTACT(state, contact) {

        },
        ADD_CONTACT(state, contact) {
            state.contacts.push(contact)
        }
    },
    actions: {
        addContact({commit}, contact) {
            
        },
        updateContact({commit}, contact) {
            
        },
        removeContact({commit}, id) {

        }
    },
    plugins: [vuexLocal.plugin]
})