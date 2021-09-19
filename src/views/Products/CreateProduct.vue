<template>
    <div class="container mt-5">
        
        <b-form>
            <b-form-group
                id="input-group-name"
                label="Nombre:"
                label-for="input-name"
            >
            <b-form-input
            ref="inputName"
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
        <b-button @click="createProduct()" variant="outline-primary">Guardar</b-button>
    </div>
    
    </div>
  
</template>

<script>

const { ipcRenderer } = window.require("electron")

export default {
    name: 'CreateProductComponent',
    mounted: function () {
        ipcRenderer.on('new-product-response', () => {
            this.resetInputs()
            /* this.$refs.inputName.focus() */
    })
    },
    data () {
        return {
            name: '',
            barcode: '',
            list_price: null
        }
    },
    methods: {
        createProduct() {
            let newProduct = {
                name: this.name.toUpperCase(),
                barcode: this.barcode.toUpperCase(),
                list_price: this.list_price
            }

            ipcRenderer.send('create-product', newProduct);
        },
        resetInputs() {
            this.name = ''
            this.barcode = ''
            this.list_price = null
        }
    }

}
</script>