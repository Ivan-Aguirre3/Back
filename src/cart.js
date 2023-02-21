const fs = require('fs');

let carts = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'));

let lastCartId = carts.length > 0 ? carts[carts.length - 1].id : 0;

class Cart {
  constructor(products) {
    this.id = ++lastCartId;
    this.products = products || [];
  }

  getProducts() {
    return this.products;
  }

  addProduct(product) {
    const carts = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'));
    const cartIndex = carts.findIndex(cart => cart.id === this.id);
    if (cartIndex >= 0) {
      carts[cartIndex].products.push(product);
      fs.writeFileSync('carrito.json', JSON.stringify(carts));
    }
  }
  

  save() {
    const cartIndex = carts.findIndex(cart => cart.id === this.id);
    if (cartIndex >= 0) {
      carts[cartIndex].products = this.products;
    } else {
      carts.push(this);
    }
    fs.writeFileSync('carrito.json', JSON.stringify(carts));
  }
}

module.exports = Cart;
