<template>
    <div class="mt-3">
      <b-row>
        <b-col>
          <search-product-by-barcode-component 
            ref="searchProductByBarcodeComponentRef"
            @remove-last-item="removeLastItemFromTable" 
            @product-selected="insertNewProduct($event)"
            @enter-input-empty="nextToPayWith" />
        </b-col>
        <b-col cols="2" style="display: flex; justify-content: center; align-items: flex-end;">
          <b-button @click="showModalToSearchProductByName" variant="outline-primary">Buscar Producto <b-icon-search/></b-button>

        </b-col>
      </b-row>
      <b-row>
      
  
        <div class="mt-3">
          <b-table id="main-table" primary-key="index" sticky-header="450px" striped hover :fields="fields"  :items="products" bordered	>

            <!-- A custom formatted column -->
            <template #cell(quantity)="data">
              <div @click="showModalQuantity(data.index)">
              {{ data.item.quantity }}
              </div>
            </template>

            <!-- A custom formatted column -->
            <template #cell(name)="data">
              <div>
                <span>{{ data.item.name }} </span> <b-badge style="background: red;" v-show="data.item.quantity <= 0" variant="danger">CANCELADO</b-badge>
              </div>
            </template>

            <!-- A custom formatted column -->
            <template #cell(list_price)="data">
              $ {{ data.item.list_price | formatDecimal }}
            </template>

            <!-- A custom formatted column -->
            <template #cell(subtotal)="data">
              $ {{ data.item.subtotal | formatDecimal }}
            </template>
              
          </b-table>
        </div>
      </b-row>

      <b-row>
        <b-col>
          <div style="display: flex; align-items: center;">
            <div>
              <label>TOTAL DE PRODUCTOS: </label> 

            </div>
            <div>
              <span style="font-size: 30px; margin-left: 10px;">{{ totalOfProducts | formatDecimal }} </span>
            </div>
          </div>
        </b-col>
        <b-col></b-col>
        <b-col>
          <b-table-simple style="font-size: 30px;">
            <b-tr>
              <b-td>TOTAL:</b-td>
              <b-td style="display: flex; justify-content: flex-end; margin-right: 20px;">{{ total | formatMxn }}</b-td>
            </b-tr>
          </b-table-simple>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
          <b-table-simple style="font-size: 30px;">
            <b-tr>
              <b-td>PAGA CON:</b-td>
              <b-td>
                <b-input 
                  ref="inputPayWith"
                  type="number"
                  v-model="payWith" 
                  autocomplete="false"
                  :state="this.yourChange !== null && this.payWith && this.products.length > 0 ? true : null"
                  @keyup="pressInputHandler($event)"
                  />
              </b-td>
            </b-tr>
          </b-table-simple>
        </b-col>
      </b-row>
      <b-row>
        <b-col></b-col>
        <b-col></b-col>
        <b-col>
          <b-table-simple v-show="yourChange !== null" style="font-size: 30px;">
            <b-tr>
              <b-td style="color: red;">SU CAMBIO:</b-td>
              <b-td style="color: red; display: flex; justify-content: flex-end; margin-right: 20px;">{{ yourChange | formatMxn }}</b-td>
            </b-tr>
          </b-table-simple>
        </b-col>
      </b-row>
      <search-product-by-name-modal-component ref="modalToSearchProductByName" @addProductToSale="insertNewProduct($event)"/>

      <change-quantity-modal-component @saveNewQuantity="changeNewQuantity($event)" ref="modalToChangeQuantityProductRef" />
    </div>

</template>

<script>
import ChangeQuantityModalComponent from '../components/ChangeQuantityModalComponent.vue'
import SearchProductByBarcodeComponent from '../components/SearchProductByBarcodeComponent.vue'
import SearchProductByNameModalComponent from '../components/SearchProductByNameModalComponent.vue'

/* const { ipcRenderer } = require('electron'); */
/* const { ipcRenderer } = window.require("electron") */



export default {
  components: { SearchProductByBarcodeComponent, SearchProductByNameModalComponent, ChangeQuantityModalComponent },
  name: 'CashComponent',
  data: function () {
    return {
      fields: [
        {
          key: 'index',
          label: '#',
          tdClass: 'index-class'
        },
        {
          key: 'name',
          label: 'NOMBRE',
          tdClass: 'name-class'
        },
        {
          key: 'quantity',
          label: 'CANTIDAD',
          tdClass: 'quantity-class'
        },
        {
          key: 'list_price',
          label: 'PRECIO',
          tdClass: 'list-price-class'
        },
        {
          key: 'subtotal',
          label: 'IMPORTE',
          tdClass: 'subtotal-class'
        }
      ],
      barcode: '',
      products: [],
      total: 0,
      totalOfProducts: 0,
      payWith: null,
      yourChange: null

    }
  },
  mounted: function () {

    /* ipcRenderer.on('product', (e, products) => {
      console.log(products)
      if (products) {
        this.insertNewProduct(products);

      }
    }) */
    this.$nextTick(() => {
      this.$refs.searchProductByBarcodeComponentRef.$refs['inputBarcode'].focus();

    })
    
  },
  methods: {
    insertNewProduct(newProduct) {
      if (newProduct && newProduct.quantity >= 0) {
        newProduct.subtotal = newProduct.quantity * newProduct.list_price
        newProduct.index = this.products.length + 1;
        this.products.push(newProduct)
        this.sumProductsTotal()
        this.sumTotalOfProducts()
        this.$nextTick(() => {
          let row = document.getElementById('main-table__row_' + (this.products.length));
          row.scrollIntoView(true);

        })
      }
    },
    removeLastItemFromTable() {
      this.products.splice(-1)
      this.sumProductsTotal()
      this.sumTotalOfProducts()
    },
    sumProductsTotal() {
      this.total = this.products.reduce(function(a, b){
        return a + b.subtotal;
      }, 0);
    },
    sumTotalOfProducts() {
      this.totalOfProducts = this.products.reduce(function(a, b){
        return a + b.quantity;
      }, 0);
    },
    nextToPayWith() {
      if (this.products.length > 0) {
        this.$refs.inputPayWith.focus();
      }
    },
    returnToSearchProductByBarcodeInput() {
      this.$nextTick(() => {
        this.$refs.searchProductByBarcodeComponentRef.$refs.inputBarcode.focus();
        this.payWith = null
        this.yourChange = null
      })
    },
    calculateChange() {
      console.log('change', this.yourChange)
      console.log('pago con', this.payWith)
      if (this.yourChange !== null && this.payWith && this.products.length > 0) {
        console.log('venta registrada')
        this.soldOut()
      }
      if (this.payWith > 0) {
        this.yourChange =  this.payWith - this.total
      }
    },
    soldOut() {
      this.resetControls()

    },
    resetControls() {
      this.yourChange = null
      this.payWith = null
      this.total = 0
      this.totalOfProducts = 0
      this.products = []
      this.barcode = ''
      this.$refs.searchProductByBarcodeComponentRef.$refs.inputBarcode.focus();
    },
    deletePayWith() {
      this.yourChange = null
    },
    pressInputHandler(value) {
      if (value.key === 'Enter') {
        this.calculateChange()
        return
      }

      if (value.key === 'Backspace') {
        this.deletePayWith()
        return
      }

      if (value.key === 'Escape') {
        this.returnToSearchProductByBarcodeInput()
        return
      }
      if (this.yourChange || this.yourChange === 0) {
        this.deletePayWith()
      }
      //this.calculateChange()
      console.log('es numero o texto', value)
      console.log('your change', this.yourChange)
    },
    showModalToSearchProductByName() {
      this.$refs.modalToSearchProductByName.showModal = true
    },
    showModalQuantity(index) {
      console.log(index)
      this.$refs.modalToChangeQuantityProductRef.showModal = true
      this.$refs.modalToChangeQuantityProductRef.productIndex = index
      this.$refs.modalToChangeQuantityProductRef.quantity = this.products[index].quantity
      
    },
    changeNewQuantity(data) {
      this.products[data.index].quantity = parseFloat(data.quantity)
      this.products[data.index].subtotal = data.quantity * this.products[data.index].list_price
      this.sumProductsTotal()
      this.sumTotalOfProducts()
    }
  },
  filters: {
  formatMxn: function (value) {
    const options2 = { style: 'currency', currency: 'MXN' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);
    return numberFormat2.format(value);
  },
  formatDecimal: function (value) {
    /* const options2 = { style: 'currency', currency: 'MXN' }; */
    const numberFormat2 = new Intl.NumberFormat('en-US');
    return numberFormat2.format(value);
  },
  formatWithTwoDecimal: function (value) {
    return value.toFixed(2);
  }
}
}
</script>

<style>
.index-class {
  width: 1px !important;
  font-size: 20px;
}
.name-class {
  width: 70%;
  font-size: 20px;
}
.quantity-class {
  width: 10%;
  font-size: 20px;
}
.list-price-class {
  width: 10%;
  font-size: 20px;
}
.subtotal-class {
  width: 10%;
  font-size: 20px;
}

.bandge-danger {
    background: red !important;
}
</style>