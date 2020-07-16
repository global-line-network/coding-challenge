<template>
  <div>
    <div v-if="contactList.length > 0">
      <div class="row">
        <div v-for="(contact, index) in contactList" :key="contact.id" class="col-12 col-md-6 col-lg-4 ">
          <div class="contact-item d-flex flex-row mb-4 card p-3">
            <div class="d-flex">
              <img class="img-thumbnail list-thumbnail align-self-center m-2 rounded-circle small" v-bind:src="contact.pic" />
              <div class="contact-item-left">
                <div class="contact-item-label pb-0 m-auto">{{contact.name}}</div>
                <div class="text-muted text-small mb-2 card-text contact-item-label pt-0 m-auto">{{contact.username}}</div>
              </div>
            </div>
            <div class="action-container btn-group">
            <div data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div class="dots-icon"></div>
            </div>
            <div class="dropdown-menu border-round">
              <a class="dropdown-item"  @click="editContact(contact, index)">Edit user</a>
              <div class="dropdown-divider"></div>
              <a class="dropdown-item" style="color: red" @click="removeContact(index)">Delete user</a>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <h3 v-else>No users found.</h3>

    <!-- Modals -->

    <div class="modal fade" id="addContact" tabindex="-1" role="dialog" aria-labelledby="addContactLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-round">
          <div class="modal-header">
            <h5 class="modal-title" id="addContactLabel">Add new user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pb-5 pl-5 pr-5 pt-4">
            <div class="mb-5 text-center">
              <img v-if="newContact.pic !== ''" v-bind:src="newContact.pic" class="uploading-image img-thumbnail list-thumbnail align-self-center m-2 rounded-circle m-auto small" />
              <input id="f02" type="file" @change="uploadImage" placeholder="Add profile picture" />
              <label class="custom-btn border-round" for="f02">{{newContact.pic === '' ? 'Add picture' : 'Change picture'}}</label>
            </div>
            <label>Name</label>
            <input 
              type="text" 
              class="contact-input" 
              placeholder="Mark Smith" 
              v-model="newContact.name" 
            >
            <label>Username</label>
            <input 
              type="text" 
              class="contact-input" 
              placeholder="@marksmith" 
              v-model="newContact.username" 
            >
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary custom-btn border-round p-2" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-outline-primary custom-btn border-round p-2" @click="addContact()">Save changes</button>
          </div>
        </div>
      </div>
    </div>
    
    <div class="modal fade" id="editContact" tabindex="-1" role="dialog" aria-labelledby="editContactLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
        <div class="modal-content border-round">
          <div class="modal-header">
            <h5 class="modal-title" id="editContactLabel">Edit user</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body pb-5 pl-5 pr-5 pt-4">
            <div class="mb-5 text-center">
              <img v-bind:src="contactToEdit.pic" class="uploading-image img-thumbnail list-thumbnail align-self-center m-2 rounded-circle m-auto small" />
              <input id="change-pic" type="file" @change="changeImage" placeholder="Add profile picture" />
              <label class="custom-btn border-round" for="change-pic">Change picture</label>
            </div>
            <label>Name</label>
            <input 
              type="text" 
              class="contact-input" 
              placeholder="Mark Smith" 
              v-model="contactToEdit.name" 
            >
            <label>Username</label>
            <input 
              type="text" 
              class="contact-input" 
              placeholder="@marksmith" 
              v-model="contactToEdit.username" 
            >
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary custom-btn border-round p-2" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-outline-primary custom-btn border-round p-2" @click="saveContact()">Save changes</button>
          </div>
        </div>
      </div>
    </div>

    <!-- End Modals -->

  </div>
</template>

<script>
import $ from 'jquery';

export default {
  name: 'ContactList',

  data(){
    return{
      newContact: {
        name: "",
        username: "",
        pic: ""
      },
      contactToEdit: {},
      indexToEdit: "",
      open: false,
      idForContact: 6,
      contactList: [
        {
          id: 1,
          name: "Mark Smith",
          username: "@marksmith",
          pic: "/man-profile-pic.jpeg",
        },
        {
          id: 2,
          name: "Diana Seidakhmetova",
          username: "@dianaseidakhmetova",
          pic: "/woman-profile-pic.jpeg",
        },
        {
          id: 3,
          name: "Gulmira Mazkenova",
          username: "@gulmiramazkenova",
          pic: "/woman-2-profile-pic.jpg",
        },
        {
          id: 4,
          name: "Bill Nelms",
          username: "@billnelms",
          pic: "/man-2-profile-pic.jpeg",
        },
        {
          id: 5,
          name: "martyotte",
          username: "@martyotte",
          pic: "/man-3-profile-pic.jpeg",
        }
      ]
    }
  },
  directives: {
    focus: {
      inserted: function (el) {
        el.focus();
      }
    }
  },
  methods: {
    uploadImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.newContact.pic = e.target.result;
      };
    },
    changeImage(e){
      const image = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = e =>{
        this.contactToEdit.pic = e.target.result;
      };
    },
    addContact(){
      if( this.newContact.name === "" || this.newContact.username === "" || this.newContact.pic === ""){
        return
      }
      this.contactList.push({
        id: this.idForContact,
        name: this.newContact.name,
        username: this.newContact.username,
        pic: this.newContact.pic,
      })

      $('#addContact').modal('hide');

      this.newContact = {
        name: "",
        username: "",
        pic: ""
      },
      this.idForContact++
    },
    removeContact(index){
      this.contactList.splice(index, 1);
    },

    editContact(contact, index){
      this.contactToEdit = {...contact};
      this.indexToEdit = index;
      $('#editContact').modal('show');
    },

    saveContact(){
      const index = this.indexToEdit;
      const contact = this.contactToEdit;
      const newList = this.contactList.map((item, id) => { return id === index ? contact : item; });
      this.contactList = newList;
      $('#editContact').modal('hide');
    },
  
  }
}
</script>

<style>

  /* Custom input-file */

  [type=file] {
    position: absolute;
    filter: alpha(opacity=0);
    opacity: 0;
  }

  input, [type=file] + label {
    border: 1px solid #CCC;
    border-radius: 3px;
    text-align: left;
    padding: 10px;
    width: 150px;
    margin: 0;
    left: 0;
    position: relative;
  }

  [type=file] + label {
    text-align: center;
    /* left: 7.35em; */
    top: 0.5em;
    /* Decorative */
    background: #333;
    color: #fff;
    border: none;
    cursor: pointer;
  }

  [type=file] + label:hover {
    background: #3399ff;
  }

  /* End custom input-file */

  .custom-btn{
    width: 30%;
  }

  .contact-item{
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 1px 15px rgba(0,0,0,.04), 0 1px 6px rgba(0,0,0,.04);
    border: none!important;
    border-radius: .75rem!important;
  }

  .contact-item-label{
    padding: 10px;
    border: 1px solid white;
  }

  /* Images */

  .list-thumbnail.small {
    height: 60px;
    width: 60px;
    font-size: 1rem;
  }

  .list-thumbnail {
    border-radius: .1rem;
    padding: 0;
    border: initial;
    height: auto;
    max-width: unset;
    height: 85px;
    object-fit: cover;
  }

  .img-thumbnail {
    border: none!important;
    padding: 0;
  }

  /* End images */


  /* Action-container */

  .action-container{
    position: absolute!important;
    display: flex;
    right: 10px;
    cursor: pointer;
    top: 10px;
  }

  .dropdown-menu{
    border: 1px solid #f1f1f1!important;
  }

  .dots-icon:after {
    content: '\2807';
    font-size: 30px;
    color: #9fa2a5;
  }

  /* End action-container */



  /* Modals */

  #addContact .modal-content, #editContact .modal-content{
    border: none;
  }

  .contact-input{
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border: 1px solid #efefef;
    border-radius: 20px;

  }

  .contact-input:focus{
    outline: 0;
  }

  .uploading-image{
    display:flex;
  }

  .modal .uploading-image{
    width: 90px;
    height: 90px;
  }

  /* End modals */

</style>
