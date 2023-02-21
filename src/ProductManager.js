class Product {
  static nextId = 1;

  constructor(title, description, price, thumbnail, code, stock) {
    this.id = Product.nextId++;
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = parseInt(stock);
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(product) {
    if (Object.keys(product).length !== 7) {
      console.error('All fields are required');
      return;
    }

    for (const existingProduct of this.products) {
      if (existingProduct.code === product.code) {
        console.error('Code already exists');
        return;
      }
    }

    product.id = this.nextId++;
    this.products.push(product);
  }

  getProductById(id) {
    for (const product of this.products) {
      if (product.id === id) {
        return product;
      }
    }
    console.error('Not found');
    return null;
  }

  updateProduct(id, newData) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.error('Product not found');
      return;
    }

    const existingProduct = this.products[productIndex];
    const updatedProduct = { ...existingProduct, ...newData };

    if (Object.keys(updatedProduct).length !== 7) {
      console.error('All fields are required');
      return;
    }

    if (this.products.some(product => product.code === updatedProduct.code && product.id !== updatedProduct.id)) {
      console.error('Code already exists');
      return;
    }

    this.products[productIndex] = updatedProduct;
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.error('Product not found');
      return;
    }

    this.products.splice(productIndex, 1);
  }

  getProducts() {
    return this.products;
  }
}

module.exports = ProductManager;
