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
                autocomplete="false"
                @keyup.esc="removeLastItem"
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
        
        ipcRenderer.on('product', (e, product) => {
            if (product) {
                product.quantity = this.quantity;
                this.$emit('product-selected', product)
                

            }
            this.quantity = 1;
        })
    },
    data () {
        return {
            barcode: '',
            quantity: 1
        }
    },
    methods: {
        searchProduct() {
            if (this.barcode === '') {
                this.$emit('enter-input-empty');
            }
            if (this.barcode) {
                // Checa si trae *
                let barcodeWithQuantity = this.barcode.split('*');
                console.log(barcodeWithQuantity)
                if (barcodeWithQuantity.length > 1) {
                    if (barcodeWithQuantity[0]) {
                        this.quantity = parseFloat(barcodeWithQuantity[0]);
                        this.barcode = barcodeWithQuantity[1];
                    } else {
                        return;
                    }
                }
                ipcRenderer.send('search-product-by-barcode', this.barcode.toUpperCase());
                this.barcode = ''

            }
        },
        removeLastItem() {
            this.$emit('remove-last-item');
        }
    }

}
</script>

<style>

</style>