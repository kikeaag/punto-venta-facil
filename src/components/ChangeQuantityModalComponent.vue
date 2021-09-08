<template>
    <div>
        <b-modal hide-footer @shown="focusMyElement" return-focus="#input-barcode" v-model="showModal" title="Cantidad">
            <div style="display: flex;">
                <b-form-input min="0" @keyup.enter="save" ref="inputQuantityRef" style="margin: 10px;" type="number" v-model="quantity" ></b-form-input>
                <b-button @click="save" style="margin: 10px;" variant="outline-primary">Guardar <b-icon-plus-circle/></b-button>
            </div>
        </b-modal>
    </div>

  
</template>

<script>
export default {
    name: 'ChangeQuantityModalComponent',
    data () {
        return {
            showModal: false,
            quantity: null,
            productIndex: null
        }
    },
    methods: {
        save() {
            if (this.quantity && this.quantity >= 0) {
                this.$emit('saveNewQuantity', {
                    quantity: this.quantity,
                    index: this.productIndex
                })

            }

            this.resetControls()
            this.showModal = false
        },
        resetControls() {
            this.quantity = null
            this.productIndex = null
        },
        focusMyElement() {
            this.$refs.inputQuantityRef.focus()
        }
    }

}
</script>

<style>

</style>