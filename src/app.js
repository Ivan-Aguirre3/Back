const express = require('express');
const app = express();
const products = require('./products.json');

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

app.listen(8080, () => {
console.log('Server listening on port 8080');
});