var sqlite3 = require('sqlite3').verbose();
/* var db = new sqlite3.Database('punto_venta_facil', sqlite3.OPEN_CREATE); */

// Se crea tabla productos

function openDB() {
  `${__dirname}/assets/punto_venta_facil.db`
  return new sqlite3.Database(`${__dirname}/assets/punto_venta_facil`);
}

function createTableProducts() {

  let db = openDB();

  db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS products (id INTEGER PRIMARY KEY AUTOINCREMENT, barcode TEXT NULL, name TEXT NOT NULL, cost_price REAL NULL, list_price REAL NOT NULL, status INTEGER DEFAULT 1)");
  });

  closeConnection(db);

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

function createProduct() {
  /* db.run('INSERT INTO products VALUES(12345, 1 KG TORTILLA ROSY, 16, 20)'); */

  db.run(`INSERT INTO products(barcode, name, cost_price, list_price) VALUES(?,?,?,?)`, ['12345', '1 KG TORTILLA ROSY', 16, 20], function(err) {
    if (err) {
      return console.log(err.message);
    }
    // get the last insert id
    console.log(`A row has been inserted with rowid ${this.lastID}`);
  });
}

function searchProductByBarcode(barcode) {
  let db = openDB();

  return new Promise((resolve, reject) => {
    db.get(`select * from products where barcode = ?`, [barcode], (err, rows) => {
      if (err) {
        console.log(err)
        closeConnection(db);
        reject(err);
      }
      console.log(rows)
      closeConnection(db);
      resolve(rows);
    })
  });
}

function closeConnection(db) {
  db.close();
}


module.exports = {
  createTableProducts,
  allProducts,
  dropTableProducts,
  createProduct,
  searchProductByBarcode
}