import {createStore} from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
    storage: window.localStorage
})
export default createStore({
    state() {
        return {
            contacts: []
        }
    },
    getters: {
        contacts (state) {
            return state.contacts
        },
    },
    mutations: {
        REMOVE_CONTACT(state, slug) {
            const index = state.contacts.findIndex(item => item.slug === slug)
            state.contacts.splice(index, 1)
        },
        UPDATE_CONTACT(state, contact) {
            const index = state.contacts.findIndex(item => item.slug === contact.slug)
            state.contacts[index] = contact
        },
        ADD_CONTACT(state, contact) {
            state.contacts.unshift(contact)
        }
    },
    actions: {
        addContact({commit}, contact) {
            commit('ADD_CONTACT', contact)
        },
        updateContact({commit}, contact) {
            commit('UPDATE_CONTACT', contact) 
        },
        removeContact({commit}, slug) {
            commit('REMOVE_CONTACT', slug)
        }
    },
    plugins: [vuexLocal.plugin]
})