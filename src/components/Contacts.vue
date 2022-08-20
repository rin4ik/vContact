<template>
    <div class="mt-12 relative max-w-4xl mx-auto">
        <div class="flex justify-end mb-12">
            <button v-if="contacts.length" @click="displayModal(true); updateActionName('Добавить')" type="button"
                class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <svg class="-ml-1 mr-2 h-5 w-5" x-description="Heroicon name: solid/plus"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd"
                        d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                        clip-rule="evenodd"></path>
                </svg>
                Добавить
            </button>
        </div>
        <ul v-if="contacts.length" role="list"
            class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
            <li v-for="contact in contacts" :key="contact.slug"
                class="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200">
                <div class="flex-1 flex flex-col p-8">
                    <img class="w-32 h-32 flex-shrink-0 mx-auto rounded-full"
                        :src="`https://avatars.dicebear.com/api/avataaars/${contact.slug}.svg`" alt="">
                    <h3 class="mt-6 text-gray-900 text-sm font-medium">{{ contact.name }}</h3>
                    <dd class="mt-3">
                        <span class="px-2 py-1 text-green-800 text-xs font-medium bg-green-100 rounded-full">{{
                                contact.tags
                        }}</span>
                    </dd>
                </div>
                <div>
                    <div class="-mt-px flex divide-x divide-gray-200">
                        <div class="w-0 flex-1 flex">
                            <a :href="`mailto:${contact.email}`"
                                class="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500">
                                <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                </svg>
                            </a>
                        </div>
                        <div class="-ml-px w-0 flex-1 flex">
                            <a :href="`tel:${contact.phone}`"
                                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                <svg class="w-5 h-5 text-gray-400" xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                    <path
                                        d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                                </svg>
                            </a>
                        </div>
                        <div class="-ml-px w-0 flex-1 flex">
                            <div @click="deleteContact(contact.slug)"
                                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                <svg class="cursor-pointer h-5 w-5 text-red-400 group-hover:text-red-600"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    aria-hidden="true">
                                    <path fill-rule="evenodd"
                                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                        clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                        <div class="-ml-px w-0 flex-1 flex">
                            <div
                                class="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500">
                                <svg @click="updateContact(contact)" xmlns="http://www.w3.org/2000/svg"
                                    class="cursor-pointer w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor" stroke-width="2">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-else class="bg-white px-4 py-12">
            <div class="text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    aria-hidden="true">
                    <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">Нет Контактов</h3>
                <div class="mt-6">
                    <button @click="displayModal(true); updateActionName('Добавить')" type="button"
                        class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                        <svg class="-ml-1 mr-2 h-5 w-5" x-description="Heroicon name: solid/plus"
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            aria-hidden="true">
                            <path fill-rule="evenodd"
                                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                                clip-rule="evenodd"></path>
                        </svg>
                        Добавить
                    </button>
                </div>
            </div>
        </div>
    </div>
    <ContactForm @close="displayModal(false)" v-if="modal" :actionName="actionName" :contact="contact" />
</template>
<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue'
import ContactForm from './ContactForm.vue'
export default ({
    components: { ContactForm },
    setup() {
        const actionName = ref(null)
        const modal = ref(false)
        const contact = ref(null)
        const store = useStore();
        let contacts = store.getters.contacts
        const displayModal = (state) => {
            modal.value = state
            setContact(null)
        }
        const setContact = (incoming) => {
            contact.value = incoming
        }
        const updateContact = (incoming) => {
            displayModal(true);
            setContact(incoming)
            updateActionName('Изменить')
        }
        const deleteContact = (slug) => {
            store.dispatch('removeContact', slug)
        }
        const updateActionName = (action) => {
            actionName.value = action
        }
        return {
            modal,
            contact,
            contacts,
            actionName,
            displayModal,
            updateActionName,
            updateContact,
            deleteContact
        }
    },
})
</script>
