const { app, BrowserWindow, Menu, ipcMain } = require('electron');

const url = require("url");
const path = require("path");
const { allProducts, createTableProducts, searchProductByBarcode } = require('./src/db');

// Carga los productos, esto es de prueba



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

ipcMain.on('search-product-by-barcode', (e, barcode) => {
  searchProductByBarcode(barcode).then((response) => {
    console.log('respuesta', response)
    mainWindow.webContents.send('product', response);
  });

  /* createTableProducts() */
  
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