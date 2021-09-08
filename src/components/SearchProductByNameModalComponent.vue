<template>
    <div>
        <b-modal hide-footer scrollable return-focus="#input-barcode" v-model="showModal" id="modal-xl" size="xl" title="Busqueda de producto por nombre">
            <div class="container">
                <b-row>
                    <b-form-group
                        id="input-product-name"
                        label-for="input-product-name"
                        
                        >
                        <b-form-input autofocus ref="inputProductName" @keyup.enter="searchProduct" id="input-product-name" placeholder="Ingrese el nombre del producto" v-model="productName" trim></b-form-input>
                        </b-form-group>
                </b-row>
                <b-row class="mt-3">
                    <b-table striped hover :items="products" :fields="fields">

                        <!-- A custom formatted column -->
                        <template #cell(quantity)="data">
                            <b-form-input min="0" v-model="inputQuantity[data.index]" type="number" trim></b-form-input>
                        </template>
                        <!-- A custom formatted column -->
                        <template #cell(actions)="data">
                            <b-button @click="addProduct(data.index)" variant="outline-primary">Agregar Producto <b-icon-plus-circle/></b-button>
                        </template>
                    </b-table>
                </b-row>
            </div>
        </b-modal>
    </div>
</template>

<script>

const { ipcRenderer } = window.require("electron")

export default {
    name: 'SearchProductByNameModalComponent',
    mounted() {

        ipcRenderer.on('search-product-by-name-response', (e, response) => {
            if (response) {
                this.products = response;
            }
            
        })
    },
    data() {
        return {
            productName: '',
            products: [],
            inputQuantity: [],
            showModal: false,
            fields: [
                {
                    key: 'name',
                    label: 'NOMBRE',
                    tdClass: 'name-class'
                },
                {
                    key: 'list_price',
                    label: 'PRECIO',
                    tdClass: 'list-price-class'
                },
                {
                    key: 'quantity',
                    label: 'CANTIDAD',
                    tdClass: 'quantity-class'
                },
                {
                    key: 'actions',
                    label: '',
                    tdClass: 'actions-class'
                },
            ]
        }
    },
    methods: {
        searchProduct() {
            ipcRenderer.send('search-product-by-name', this.productName);
        },
        addProduct(index) {

            if (this.inputQuantity[index] === undefined) this.inputQuantity[index] = 1;
            if (this.inputQuantity[index] && this.inputQuantity[index] >= 0) {
                this.products[index].quantity = this.inputQuantity[index] === undefined ? 1 : parseFloat(this.inputQuantity[index]);
                
                this.$emit('addProductToSale', this.products[index]);

            }

            this.toHideModal();
            this.resetControls()
            
        },
        toShowModal() {
            this.showModal = true
        },
        toHideModal() {
            this.showModal = false
        },
        resetControls() {
            this.inputQuantity = [];
            this.productName = '';
            this.products = [];
        }
    }

}
</script>

<style scoped>

.index-class {
  width: 80%;
}

.list-price-class {
  width: 10%;
}

.quantity-class {
  width: 10%;
}

.actions-class {
  width: 10%;
}

</style>