<template>
    <div class="container mt-5">
        
        <search-product-by-barcode-component ref="searchProductByBarcodeComponent" @product-selected="productSelected($event)" />

        <b-form class="mt-4">
            <b-form-group
                id="input-group-name"
                label="Nombre:"
                label-for="input-name"
            >
            <b-form-input
            id="input-name"
            v-model="name"
            type="text"
            ></b-form-input>
        </b-form-group>

        <b-form-group class="mt-4" id="input-group-barcode" label="Código de barras:" label-for="input-barcode">
            <b-form-input
            id="input-barcode"
            v-model="barcode"
            ></b-form-input>
        </b-form-group>

        <!-- <b-form-group class="mt-4" id="input-group-cost-price" label="Precio de compra:" label-for="input-cost-price">
            <b-form-input
            type="number"
            id="input-cost-price"
            v-model="cost_price"
            ></b-form-input>
        </b-form-group> -->

        <b-form-group class="mt-4" id="input-group-list-price" label="Precio de venta:" label-for="input-list-price">
            <b-form-input
            type="number"
            id="input-list-price"
            v-model="list_price"
            ></b-form-input>
        </b-form-group>
    </b-form>

    <div class="mt-5 d-flex justify-content-md-center justify-content-lg-center">
        <b-button @keyup.enter="editProduct()" @click="editProduct()" variant="outline-primary">Guardar</b-button>
    </div>
    
    </div>
  
</template>

<script>

const { ipcRenderer } = window.require("electron")

import SearchProductByBarcodeComponent from '../../components/SearchProductByBarcodeComponent.vue'
export default {
  components: { SearchProductByBarcodeComponent },
    name: 'EditProductComponent',
    data () {
        return {
            barcode: '',
            name: '',
            list_price: null,
            id: null
        }
    },
    mounted: function () {
        ipcRenderer.on('edit-product-response', () => {
            this.resetInputs()
        })
    },
    methods: {
        productSelected(product) {
            this.barcode = product.barcode
            this.name = product.name
            this.list_price = product.list_price
            this.id = product.id
        },
        editProduct() {
            if (this.id) {
                let newProduct = {
                    name: this.name.toUpperCase(),
                    barcode: this.barcode.toUpperCase(),
                    list_price: this.list_price,
                    id: this.id
                }
    
                ipcRenderer.send('edit-product', newProduct);

            }
        },
        resetInputs() {
            this.id = null
            this.name = ''
            this.barcode = ''
            this.list_price = null
            
        }
    }


}
</script>

