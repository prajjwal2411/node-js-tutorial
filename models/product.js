const fs = require('fs');
const path = require('path');

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
    constructor(title, imageUrl, price, description) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.price = price;
        this.description = description;
    }

    save() {
        this.id = Math.random().toString();
        getproductsFromFile(products => {
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), (err) => {
                console.log(err);
            });
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
}