<template>
  <div id="app">

    <nav-component @goToCash="goToCash" @goToCreateProduct="goToCreateProduct"></nav-component>
    
    <div id="nav">
      
      <!-- <button @click="goToCreateProduct()">About</button>
      <button @click="goToCash()">CAJA</button> -->
      
    </div>

    <div v-if="showCreateProductComponent">
      <create-product-component />
    </div>

    <div class="container" v-show="showCashComponent">
      <cash-component ref="cashComponent"></cash-component>
    </div>

    

    
  </div>
</template>

<script>

const electron = window.require("electron")
//const { electron } = require('electron');

// @ is an alias to /src
import NavComponent from '@/views/NavComponent.vue'
import CashComponent from './views/CashComponent.vue'
import CreateProductComponent from './views/Products/CreateProduct.vue'



export default {
  name: 'App',
  components: {
    NavComponent,
    
    CashComponent,
    CreateProductComponent
  },
  mounted: function(){
    
    electron.ipcRenderer.on('goToHome', ()=>{
      this.$router.push('/');
    });
    electron.ipcRenderer.on('goToAbout', ()=>{
      console.log('abouttttt')
      this.$router.push('/about');
    });
  },
  methods: {
    goToCreateProduct() {
      console.log('abouttttt')
      this.showCreateProductComponent = true
      this.showCashComponent = false
      /* this.$router.push({name: 'AboutComponent'}) */
      /* electron.ipcRenderer.on('goToAbout', ()=>{
      //this.$router.push('/about');
    }); */
    },
    goToCash() {
      this.showCreateProductComponent = false
      this.showCashComponent = true
      
      /* this.$router.push({name: 'AboutComponent'}) */
      
    }
  },
  data: function () {
    return {
      showCreateProductComponent: false,
      showCashComponent: true,

    }
  }
}
</script>

<style>

</style>
