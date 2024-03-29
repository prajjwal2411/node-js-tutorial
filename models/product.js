const fs = require('fs');
const path = require('path');

const Cart = require('./cart')

const p = path.join(
    path.dirname(require.main.filename),
    'data',
    'products.json'
);

const getproductsFromFile = (cb) => {
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            cb([]);
        } else {
            cb(JSON.parse(fileContent));
        }
    });
};

module.exports = class Product {
    constructor(id, title, imageUrl, price, description) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        getproductsFromFile(products => {
            if (this.id) {
                const  existingProductIndex = products.findIndex(prod => prod.id === this.id);
                const updatedProducts = [...products];
                updatedProducts[existingProductIndex] = this;
                fs.writeFile(p, JSON.stringify(updatedProducts), (err) => {
                    console.log(err);
                });
            } else {
                this.id = Math.random().toString();
                products.push(this);
                fs.writeFile(p, JSON.stringify(products), (err) => {
                    console.log(err);
                });
            }
        });
    }

    static fetchAll(cb) {
        getproductsFromFile(cb);
    }

    static findById(id, cb) {
        getproductsFromFile(products => {
            const product = products.find(p => p.id === id);
            cb(product);
        });
    }

    static deleteById(id) {
        getproductsFromFile(products => {
            const product = products.find(prod => prod.id !== id);
            const updatedProducts = products.filter(prod => prod.id !== id);
            fs.writeFile(p, JSON.stringify(updatedProducts), err => {
                if (!err) {
                    Cart.deleteProduct(id, product.price);
                }
            });
        });
    }
}