<template>

    <div>
        
        <b-form-group
            id="input-group-barcode"
            label="Código de barras:"
            label-for="input-barcode"
        >
            <b-form-input
            ref="inputBarcode"
                id="input-barcode"
                v-model="barcode"
                type="text"
                placeholder="Buscar por código de barras"
                @keyup.enter="searchProduct"
                >
            </b-form-input>
        </b-form-group>
    </div>
  
</template>

<script>

const { ipcRenderer } = window.require("electron")

export default {
    name: 'SearchProductByBarcodeComponent',
    mounted: function() {
        console.log('se monta')
        ipcRenderer.on('product', (e, product) => {
            if (product) {
                this.$emit('product-selected', product)
                

            }
        })
    },
    data () {
        return {
            barcode: ''
        }
    },
    methods: {
        searchProduct() {
            if (this.barcode) {
                ipcRenderer.send('search-product-by-barcode', this.barcode.toUpperCase());
                this.barcode = ''

            }
        }
    }

}
</script>

<style>

</style>