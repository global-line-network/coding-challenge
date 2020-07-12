<template>
  <div>
    <input type="text" class="contact-input" placeholder="New contact" v-model="newContact" @keyup.enter="addContact">
    <div v-for="(contact, index) in contactList" :key="contact.id" class="contact-item">
      <div class="contact-item-left">
        <div v-if="!contact.editing" class="contact-item-label">{{contact.name}}</div>
        <input v-else type="text" class="contact-item-edit" v-model="contact.name" @blur="doneEditing(contact)" @keyup.enter="doneEditing(contact)"/>
      </div>
      <div class="action-container">
        <div class="action-edit-contact" @click="editContact(contact)">
          &#9998;
        </div>
        <div class="action-edit-contact" @click="removeContact(index)">
          &times;
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactList',
  data(){
    return{
      newContact: "",
      idForContact: 3,
      contactList: [
        {
          id: 1,
          name: "Mark Smith",
          editing: false,
        },
        {
          id: 2,
          name: "Diana Seidakhmetova",
          editing: false,
        }
      ]
    }
  },
  methods: {
    addContact(){
      if (this.newContact.trim().length == 0 ){
        return
      }
      this.contactList.push({
        id: this.idForContact,
        name: this.newContact
      })

      this.newContact = "",
      this.idForContact++
    },
    removeContact(index){
      this.contactList.splice(index, 1);
    },
    editContact(contact){
      contact.editing = true;
    },
    doneEditing(contact){
      contact.editing = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .contact-input{
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;

  }
  .contact-input:focus{
    outline: 0;
  }

  .contact-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .action-edit-contact{
    cursor: pointer;
    margin-left: 14px;
  }

  .action-edit-contact:focus{
    color: black;
  }

  .action-container{
    display: flex;
  }

  .contact-item-label{
    padding: 10px;
    border: 1px solid white;
  }

  .contact-item-edit{
    font-size: 24px;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    color: #2c3e50;
  }

  .contact-item-edit:focus{
    outline: none;
  }

</style>
