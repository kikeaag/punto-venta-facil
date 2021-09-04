var sqlite3 = require('sqlite3').verbose();
/* var db = new sqlite3.Database('punto_venta_facil', sqlite3.OPEN_CREATE); */

// Se crea tabla productos

function openDB() {
  /* `${__dirname}/assets/punto_venta_facil.db` */
  let db = new sqlite3.Database(`${__dirname}/assets/punto_venta_facil.db`);
  createTableProducts(db);
  return db;
}

function createTableProducts(db) {

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, barcode TEXT UNIQUE NOT NULL, name TEXT NOT NULL, list_price REAL NOT NULL)");
  });

}

function dropTableProducts() {
  let db = openDB();

  db.run('DROP TABLE IF EXISTS products');

  closeConnection(db);
}

function allProducts() {
  let db = openDB();

  let result = new Promise((resolve, reject) => {
    db.all('select * from products', [], (err, rows) => {
      if (err) {
        reject(err);
      }

      resolve(rows);
    })
  });

  closeConnection(db);

  return result;
  /* return db.all('select * from products', [], (err, rows) => {
    if (err) {
      throw err;
    }
    rows.forEach((row) => {
      
    });

    return rows;
    
  }); */
}

/* function createProduct() {

  db.run(`INSERT INTO products(barcode, name, cost_price, list_price) VALUES(?,?,?,?)`, ['12345', '1 KG TORTILLA ROSY', 16, 20], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
} */

function searchProductByBarcode(barcode) {
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.get(`select * from products where barcode = ?`, [ barcode.toUpperCase() ], (err, rows) => {
      if (err) {
        console.log(err)
        reject(err);
        closeConnection(db);
      }
      console.log(rows)
      resolve(rows);
      closeConnection(db);
    })
  });
}

function closeConnection(db) {
  db.close();
}

function createProduct(newProduct) {
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.run(`INSERT INTO products(name, barcode, list_price) VALUES(?,?,?)`, Object.values(newProduct), (err, rows) => {
      if (err) {
        console.log(err)
        reject(err);
        closeConnection(db);
      }
      console.log(rows)
      resolve(rows);
      closeConnection(db);
    })
  });
}

// Edita un producto
function editProduct(newProduct) {
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.run(`UPDATE products 
            SET name = ?, barcode = ?, list_price = ? 
            WHERE id = ?
            `, Object.values(newProduct), (err, rows) => {
      if (err) {
        console.log(err)
        reject(err);
        closeConnection(db);
      }
      console.log(rows)
      resolve(rows);
      closeConnection(db);
    })
  });
}

// Elimina un producto
function deleteProduct(id) {
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.run(`DELETE FROM products 
            WHERE id = ?
            `, [id], (err, rows) => {
      if (err) {
        console.log(err)
        reject(err);
        closeConnection(db);
      }
      console.log(rows)
      resolve(rows);
      closeConnection(db);
    })
  });
}

// Inserta productos masivamente
function importProducts(newProducts) {
  

  return new Promise((resolve, reject) => {
    let db = openDB();
    newProducts.map((product) => {
      if (product.name === null || product.name === '') return
      if (product.barcode === null || product.barcode === '') return
      if (product.list_price === null || product.list_price === '') return
      newProduct = {
        name: product.name,
        barcode: product.barcode,
        list_price: product.list_price
      }
      db.run(`INSERT INTO products(name, barcode, list_price) VALUES(?,?,?)`, Object.values(newProduct), (err, rows) => {
        if (err) {
          console.log(err)
          reject(err);
          closeConnection(db);
        }
        console.log(rows)
        resolve(rows);
        closeConnection(db);
      });
    })
  });
}


module.exports = {
  createTableProducts,
  allProducts,
  dropTableProducts,
  createProduct,
  editProduct,
  deleteProduct,
  searchProductByBarcode,
  importProducts
}