<template>
  <div id="app">

    <nav-component @goToView="goTo($event)" ></nav-component>
    
    <div id="nav">
      
      <!-- <button @click="goToCreateProduct()">About</button>
      <button @click="goToCash()">CAJA</button> -->
      
    </div>

    <div v-if="viewToShow === 'create-product'">
      <create-product-component />
    </div>

    <div v-if="viewToShow === 'edit-product'">
      <edit-product-component />
    </div>

    <div class="container" v-if="viewToShow === 'cash'">
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
import EditProductComponent from './views/Products/EditProductComponent.vue'



export default {
  name: 'App',
  components: {
    NavComponent,
    
    CashComponent,
    CreateProductComponent,
    EditProductComponent
  },
  mounted: function(){
    
    
    electron.ipcRenderer.on('goToHome', ()=>{
      this.$router.push('/');
    });
    electron.ipcRenderer.on('goToAbout', ()=>{
      this.$router.push('/about');
    });
  },
  methods: {
    goToCreateProduct() {
      this.showCreateProductComponent = true
      this.showCashComponent = false
      /* this.$router.push({name: 'AboutComponent'}) */
      /* electron.ipcRenderer.on('goToAbout', ()=>{
      //this.$router.push('/about');
    }); */
    },
    goTo(view) {
      console.log('de este lado', view)
      /* this.showCreateProductComponent = false
      this.showCashComponent = true */
      this.viewToShow = view
      /* this.$router.push({name: 'AboutComponent'}) */
      
    }
  },
  data: function () {
    return {
      showCreateProductComponent: false,
      showCashComponent: true,
      viewToShow: 'cash'

    }
  }
}
</script>

<style>

</style>
