const express = require('express');
const app = express();
const products = require('./products.json');
const bodyParser = require('body-parser');
const multer = require('multer');
const fs = require('fs');
const Cart = require('./cart');
const carts = require('./carrito.json');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

let productId = 100;

function generateProductId() {
  return productId++;
}

function saveProductsToFile() {
  fs.writeFile('products.json', JSON.stringify(products), err => {
    if (err) {
      console.error(err);
    } else {
      console.log('Products saved to file');
    }
  });
}

app.post('/products', (req, res) => {
  const newProduct = {
    id: generateProductId(),
    title: req.body.title,
    description: req.body.description,
    code: req.body.code,
    price: req.body.price,
    status: true,
    stock: req.body.stock,
    category: req.body.category,
    thumbnails: req.body.thumbnails,
  };
  products.push(newProduct);
  saveProductsToFile();
  res.send(newProduct);
});

app.get('/products', (req, res) => {
  let limit = req.query.limit;
  if (!limit) {
    res.send(products);
  } else {
    res.send(products.slice(0, limit));
  }
});

app.get('/products/:id', (req, res) => {
  const product = products.find(product => product.id == req.params.id);
  if (!product) {
    res.status(404).send({ message: 'Product not found' });
  } else {
    res.send(product);
  }
});

app.put('/products/:id', (req, res) => {
  const productIndex = products.findIndex(product => product.id == req.params.id);
  if (productIndex === -1) {
    res.status(404).send({ message: 'Product not found' });
  } else {
    const productToUpdate = products[productIndex];
    productToUpdate.title = req.body.title || productToUpdate.title;
    productToUpdate.description = req.body.description || productToUpdate.description;
    productToUpdate.code = req.body.code || productToUpdate.code;
    productToUpdate.price = req.body.price || productToUpdate.price;
    productToUpdate.status = req.body.status === undefined ? productToUpdate.status : req.body.status;
    productToUpdate.stock = req.body.stock || productToUpdate.stock;
    productToUpdate.category = req.body.category || productToUpdate.category;
    productToUpdate.thumbnails = req.body.thumbnails || productToUpdate.thumbnails;
    saveProductsToFile();
    res.send(productToUpdate);
  }
});


app.delete('/products/:id', (req, res) => {
  const productIndex = products.findIndex(product => product.id == req.params.id);
  if (productIndex === -1) {
    res.status(404).send({ message: 'Product not found' });
  } else {
    products.splice(productIndex, 1);
    saveProductsToFile();
    res.send({ message: 'Product deleted' });
  }
});

app.post('/api/carts', (req, res) => {
  const { id, products } = req.body;
  const newCart = new Cart(id, products);
  newCart.save();
  res.status(201).send('Carrito creado con éxito');
});

// Obtener los productos de un carrito
app.get('/api/carts/:cid', (req, res) => {
  const { cid } = req.params;
  const carts = JSON.parse(fs.readFileSync('carrito.json', 'utf-8'));
  const cart = carts.find(cart => cart.id === parseInt(cid));
  if (!cart) {
    return res.status(404).send('No se encontró el carrito solicitado');
  }
  res.status(200).json(cart.products);
});

app.post('/api/carts/:cid/product/:pid', (req, res) => {
  const { cid, pid } = req.params;

  // Busca el carrito correspondiente
  const cartIndex = carts.findIndex(cart => cart.id === parseInt(cid));
  if (cartIndex === -1) {
    return res.status(404).send('No se encontró el carrito solicitado');
  }
  const cart = carts[cartIndex];

  // Busca el producto correspondiente
  const productIndex = products.findIndex(product => product.id === parseInt(pid));
  if (productIndex === -1) {
    return res.status(404).send('No se encontró el producto solicitado');
  }
  const product = products[productIndex];

  // Agrega el producto al carrito
  const quantity = parseInt(req.body.quantity) || 1;
  const productInCartIndex = cart.products.findIndex(item => item.id === product.id);
  if (productInCartIndex !== -1) {
    // Si el producto ya está en el carrito, aumenta su cantidad
    cart.products[productInCartIndex].quantity += quantity;
  } else {
    // Si el producto no está en el carrito, agrega un nuevo item
    cart.products.push({ id: product.id, quantity });
  }

  // Guarda el carrito actualizado en el archivo JSON
  carts[cartIndex] = cart;
  fs.writeFile('carrito.json', JSON.stringify(carts), err => {
    if (err) {
      console.error(err);
      return res.status(500).send('Error al actualizar el carrito');
    }
    res.status(201).send('Producto agregado al carrito con éxito');
  });
});

app.listen(8080, () => {
  console.log('Server listening on port 8080');
});