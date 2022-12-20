const fs = require('fs');
const path = require('path');

const pathOfFile = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json'
);

module.exports = class Cart {
  
    static addProduct(id, productPrice){
        // Fetch the previous cart
        fs.readFile(pathOfFile, (error, fileContent) => {
            let cart = { products: [], totalPrice: 0};
            if (!error) {
                cart = JSON.parse(fileContent);
            }

            // Analyze the cart -> Find existing product
            const existingProductIndex = cart.products.findIndex( prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updatedProduct;

            // Add new product/ increase quantity
            if (existingProduct) {
                updatedProduct = { ...existingProduct };
                updatedProduct.qty = updatedProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updatedProduct;
            } else {
                updatedProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updatedProduct]
            }
            cart.totalPrice = cart.totalPrice + +productPrice;
            
            // Writting record into the cart
            fs.writeFile(pathOfFile, JSON.stringify(cart), err => {
                console.log(err);
            });
        });
    }

    static deleteProduct(id, productPrice) {
        fs.readFile(pathOfFile, (error, fileContent) => {
            if (error) {
                return;
            }
            const updatedCart = { ...JSON.parse(fileContent) };
            const product = updatedCart.products.find(prod => prod.id === id);
            const productQty = product.qty;

            // Just return list of products expect with this ID and then update file with them
            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);
            updatedCart.totalPrice = updatedCart.totalPrice - (productPrice * productQty);
            fs.writeFile(pathOfFile, JSON.stringify(updatedCart), err => {
                console.log(err);
            });
        });
    }

    static getCart(cb) {
        fs.readFile(pathOfFile, (error, fileContent) => {
            const cart = JSON.parse(fileContent);
            if (error) {
                cb(null);
            } else {
                cb(cart);
            }
        });
    }
  
};
