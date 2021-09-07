<template>
    <div class="container">
        <div class="mt-3">
            <b-row>
                <label for="import-products">Importar base de datos (json):</label>
            </b-row>

            <b-row>
                <b-col>
                    <input type="file"
                        @change="onFileChange"
                        id="import-products" name="import-products"
                        accept=".json"/>
                </b-col>

                <b-col>
                    <b-button @click="importProducts" v-show="showImportInput" variant="outline-primary">Importar</b-button>
                </b-col>
                <b-col></b-col>

            </b-row>
            <b-row class="mt-5">
                <b-col>
                    <b-button @click="exportProducts" variant="outline-primary">Backup Productos <b-icon-cloud-arrow-down v-show="exportSuccess" /></b-button>

                </b-col>
                
            </b-row>

        </div>
    </div>
  
</template>


<script>

const { ipcRenderer } = window.require("electron")

export default {
    name: 'ConfigurationComponent',
    mounted: function() {
        
        ipcRenderer.on('configuration-import-products-response', () => {
            
        })

        ipcRenderer.on('configuration-export-all-products-response', () => {
            this.exportSuccess = true
        })
    },
    data() {
        return {
            showImportInput: false,
            jsonProducts: null,
            exportSuccess: false
        }
    },
    methods: {
        onFileChange(e) {
            if (e.target.files.length) {
                this.showImportInput = true;
                this.jsonProducts = e.target.files
            }
            
            
        },
        importProducts() {
            const request = new XMLHttpRequest();
            request.open('GET', this.jsonProducts[0].path);
            request.responseType = 'json';
            request.send();

            request.onload = function() {
                ipcRenderer.send('configuration-import-products', request.response[2].data)
            }
        },
        exportProducts() {
            ipcRenderer.send('configuration-export-all-products')
        }
    }

}
</script>
