class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title;
    this.description = description;
    this.price = price;
    this.thumbnail = thumbnail;
    this.code = code;
    this.stock = stock;
  }
}

class ProductManager {
  constructor() {
    this.products = [];
    this.nextId = 1;
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
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
      console.error('Not found');
      return;
    }

    const existingProduct = this.products[productIndex];

    this.products[productIndex] = { ...existingProduct, ...newData, id: existingProduct.id };
  }

  deleteProduct(id) {
    const productIndex = this.products.findIndex(product => product.id === id);

    if (productIndex === -1) {
      console.error('Not found');
      return;
    }

    this.products.splice(productIndex, 1);
  }

  getProducts() {
    return this.products;
  }
}

const productManager = new ProductManager();
const product = {
  title: "producto prueba",
  description: "Este es un producto prueba",
  price: 200,
  thumbnail: "Sin imagen",
  code: "abc123",
  stock: 25
};

productManager.addProduct(product);

console.log(productManager.getProducts());
