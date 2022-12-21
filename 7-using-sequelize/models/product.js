const db = require('../util/database');
const Cart = require('./cart');

const productTableName = 'products';

module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    // This return a promise
    return db.execute(
      `INSERT INTO ${productTableName} (title, price, description, imageUrl) VALUES (?, ?, ?, ?)`,
      [this.title, this.price, this.description, this.imageUrl]
    );
  }

  static deleteById(id) {
  
  }

  static fetchAll() {
    // This return a promise
    return db.execute(`SELECT * FROM ${productTableName}`);
  }

  static findById(id){
    // This return a promise
    return db.execute(
      `SELECT * FROM ${productTableName} WHERE id = ?`,
      [id]
      );
  }
};
