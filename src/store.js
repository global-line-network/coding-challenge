import Vue from "vue";

export const user = Vue.observable({
  list: [],
  edit: false
});

export const spinner = Vue.observable({
  createUserBtn: {
    text: 'Create',
    spinner: 'fade'
  }
})