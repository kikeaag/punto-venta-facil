<template>
    <div class="mt-3">
      <b-row>
        <div class="d-flex">
          <b-form-input @keyup.enter="searchProduct" ref="inputBarcode" v-model="barcode" placeholder="Enter your name"></b-form-input>
          <b-button class="" style="margin-left: 20px;" variant="outline-primary">Buscar Producto</b-button>
        </div>
      </b-row>
      <b-row>
        <div class="mt-5">
          <b-table striped hover :items="products"></b-table>
        </div>
      </b-row>
    </div>

</template>

<script>

/* const { ipcRenderer } = require('electron'); */
const { ipcRenderer } = window.require("electron")



export default {
  name: 'CashComponent',
  data: function () {
    return {
      barcode: '',
      products: [
        {
          id: 1,
          name: '1 KG TORTILLA ROSY',
          listPrice: '20.00'
        }
      ]

    }
  },
  mounted: function () {
    this.$refs.inputBarcode.focus()

    ipcRenderer.on('product', (e, products) => {
      console.log('jalo el evento')
      console.log(e)
      console.log(products)
      if (products) {
        this.insertNewProduct(products);

      }
    })
  },
  methods: {
    searchProduct: function () {

      console.log('buscando producto')
      ipcRenderer.send('search-product-by-barcode', this.barcode);
    },
    insertNewProduct(newProduct) {
      this.products.push(newProduct)
    }
  }
}
</script>