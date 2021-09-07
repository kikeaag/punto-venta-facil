const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require("url");
const path = require("path");
const { 
        allProducts, 
        createTableProducts, 
        searchProductByBarcode, 
        createProduct,
        editProduct,
        deleteProduct,
        importProducts,
        searchProductByName
      } = require('./src/db');

const fs = require ('fs')

let mainWindow

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 900,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })

  mainWindow.maximize()

  /* mainWindow.loadFile(path.join(__dirname, `./dist/index.html`)); */

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, `./dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );


  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

// Regresa un producto, lo busca por codigo de barras
ipcMain.on('search-product-by-barcode', (e, barcode) => {
  searchProductByBarcode(barcode).then((response) => {
    
    mainWindow.webContents.send('product', response);
  });

  /* createTableProducts() */
  
});

// Regresa muchos productos, lo busca por nombre
ipcMain.on('search-product-by-name', (e, productName) => {
  searchProductByName(productName).then((response) => {
    
    mainWindow.webContents.send('search-product-by-name-response', response);
  });

  /* createTableProducts() */
  
});

// Crear un producto nuevo
ipcMain.on('create-product', (e, newProduct) => {
  createProduct(newProduct).then((response) => {
    mainWindow.webContents.send('new-product-response', response);
  });
});

// Edita un producto
ipcMain.on('edit-product', (e, newProduct) => {
  editProduct(newProduct).then((response) => {
    mainWindow.webContents.send('edit-product-response', response);
  });
});

// Elimina un producto
ipcMain.on('delete-product', (e, id) => {
  deleteProduct(id).then((response) => {
    mainWindow.webContents.send('delete-product-response', response);
  });
});

// Importa productos a la base de datos, recibe un json
ipcMain.on('configuration-import-products', (e, products) => {

  importProducts(products).then((response) => {
    mainWindow.webContents.send('configuration-import-products-response', response);
  });
});

// Exporta todos los productos de la bd, regresa un json
ipcMain.on('configuration-export-all-products', (e) => {

  allProducts().then((response) => {
    formatJson = [
      {},
      {},
      {
        data: response
      }
    ];
    const jsonString = JSON.stringify(formatJson);
    let today = new Date();
    let nameOfBackup = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    fs.writeFileSync(__dirname + '/src/assets/backup/' + nameOfBackup + '.json', jsonString, err => {
      if (err) { 
        console.log ('Error al escribir el archivo', err) 
    } else { 
        console.log ('El archivo se escribió correctamente') 
    } 
    })
    mainWindow.webContents.send('configuration-export-all-products-response', response);
  });
});

//createMenu()

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  if (mainWindow === null) createWindow()
})

function createMenu() {

    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                {label:'Home',
                  click(){
                    console.log("Navigate to Home");
                    mainWindow.webContents.send('goToHome');

                  }
              
                },
                {label:'About',                 
                
                 click(){
                  console.log("Navigate to About");
                  mainWindow.webContents.send('goToAbout');
                }},
                {label:'Exit',                 
                 click() { 
                  app.quit() 
                }}
            ]
        }
    ])
    Menu.setApplicationMenu(menu); 
  }