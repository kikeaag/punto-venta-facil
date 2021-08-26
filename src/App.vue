<template>
  <div id="app">

    <nav-component></nav-component>
    
    <div id="nav">
      
      <button @click="goToAbout()">About</button>
      <button @click="goToCash()">CAJA</button>
      
    </div>

    <div v-if="showAboutComponent">
      <about-component></about-component>
    </div>

    <div class="container" v-if="showCashComponent">
      <cash-component></cash-component>
    </div>

    

    
  </div>
</template>

<script>

console.log(window)
const electron = window.require("electron")
//const { electron } = require('electron');

// @ is an alias to /src
import NavComponent from '@/views/NavComponent.vue'
import AboutComponent from './views/AboutComponent.vue'
import CashComponent from './views/CashComponent.vue'



export default {
  name: 'App',
  components: {
    NavComponent,
    AboutComponent,
    CashComponent
  },
  mounted: function(){
    console.log('listo')
    
    electron.ipcRenderer.on('goToHome', ()=>{
      this.$router.push('/');
    });
    electron.ipcRenderer.on('goToAbout', ()=>{
      console.log('abouttttt')
      this.$router.push('/about');
    });
  },
  methods: {
    goToAbout() {
      console.log('abouttttt')
      this.showAboutComponent = true
      this.showCashComponent = false
      this.$router.push({name: 'AboutComponent'})
      electron.ipcRenderer.on('goToAbout', ()=>{
      //this.$router.push('/about');
    });
    },
    goToCash() {
      this.showAboutComponent = false
      this.showCashComponent = true
      this.$router.push({name: 'AboutComponent'})
      
    }
  },
  data: function () {
    return {
      showAboutComponent: false,
      showCashComponent: true,

    }
  }
}
</script>

<style>

</style>
