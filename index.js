const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require("url");
const path = require("path");
const { 
        allProducts, 
        createTableProducts, 
        searchProductByBarcode, 
        createProduct,
        editProduct
      } = require('./src/db');


let mainWindow
let createProductWindow

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

function createNewProductWindow() {
  createProductWindow = new BrowserWindow({
    width: 700,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  })


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