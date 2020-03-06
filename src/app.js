import Vue from 'vue'
import router from './router'
import store from './store'
import { MainApp } from './main'

Vue.config.devtools = true
Vue.component('main-app-component', MainApp)
const Deploykit = new Vue({ el: '#app', router, store });

window.Deploykit = Deploykit;
window.MainApp = MainApp;

export { Deploykit, MainApp }