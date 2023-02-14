// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from "vuex";
import Vue2Editor from "vue2-editor";
Vue.config.productionTip = false

/* eslint-disable no-new */

var firebaseConfig = {
  apiKey: "AIzaSyDXLojVOripFIkGEI5UEtbJiFD7BsUFuds",
  authDomain: "sosyalpuanlama.firebaseapp.com",
  projectId: "sosyalpuanlama",
  storageBucket: "sosyalpuanlama.appspot.com",
  messagingSenderId: "446773260091",
  appId: "1:446773260091:web:7205e480de41d4f3f6111e"
};

import firebase from "firebase";
firebase.initializeApp(firebaseConfig);

Vue.use(Vuex);
Vue.use(Vue2Editor);

import store from "./store.js";

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
