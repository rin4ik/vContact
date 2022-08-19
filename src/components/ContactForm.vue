<template>
  <div class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
  <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
    <div @click="$emit('close')" class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
    <div class="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
         <form class="space-y-8" v-if="contact" @submit.prevent="updateOrCreate">    
            <h3 class="text-lg text-center font-medium text-gray-900">{{actionName}} Контакт</h3>
                <div class="space-y-6 sm:space-y-5">
                    <div>
                        <label for="name" class="block text-sm font-medium text-gray-700">ФИО</label>
                        <div class="mt-1">
                            <input required v-model="contact.name" type="text" name="name" id="name" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Mirakhmad">
                        </div>
                    </div> 
                    <div>
                        <label for="phone" class="block text-sm font-medium text-gray-700">Номер Телефона</label>
                        <div class="mt-1">
                            <input required type="phone" v-model="contact.phone" name="phone" id="phone" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="+998337737737">
                        </div>
                    </div>
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
                        <div class="mt-1">
                            <input required type="email" v-model="contact.email" name="email" id="email" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="m.mirakhmad@gmail.com">
                        </div>
                    </div>
                    <div>
                        <label for="tags" class="block text-sm font-medium text-gray-700">Теги</label>
                        <div class="mt-1">
                            <input required type="text" v-model="contact.tags" name="tags" id="tags" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md" placeholder="Семья">
                        </div>
                    </div>
                </div> 
                <div class="mt-5 sm:mt-6 flex">
                    <button type="submit" class="inline-flex mr-2 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm">{{actionName}}</button>
                    <button @click="$emit('close')" type="button" class="inline-flex border border-gray-300 justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-black focus:outline-none focus:ring-2 focus:ring-offset-2 sm:text-sm">Закрыть</button>
                </div>
        </form> 
    </div>
  </div>
</div>
</template>
<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue' 

export default ({  
    props: ['actionName', 'contact'],
    setup(props, { emit }) {  
        const store = useStore(); 
        const creating = ref(props.contact ? false : true)
        const contactSkeleton = { 
            name: '',
            phone: null,
            tags: null,
            email: null
        }
        const contact = reactive(props.contact ? { ...props.contact } : contactSkeleton)  
        const updateOrCreate = () => {
            creating.value ? createContact() : updateContact()
        }
        const updateContact = () => {
            store.dispatch('updateContact', contact)
            .then(() => emit('close'))
        } 
        const createContact = () => { 
            console.log(contact)
            store.dispatch('addContact', {...contact, slug: Math.random().toString(16).slice(2)})
            .then(() => { 
                 contact.value = contactSkeleton
                 emit('close')
            })
        } 
        return { 
            actionName: props.actionName,
            contact,
            updateOrCreate
        }
    },
})
</script>