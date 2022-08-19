<template> 
  <div class="card">
      <div class="contact" v-for="(contact, index) in contacts" :key="index">
          {{contact.name}}
      </div>
  </div>
</template> 
<script>
import { useStore } from 'vuex'
import { reactive, ref } from 'vue' 
export default ({
    setup() {
        const store = useStore();  
        const contacts = store.getters.contacts 
        return {
            contacts
        }
    },
})
</script>
