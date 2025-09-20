const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const PRODUCTS_FILE = path.join(__dirname, 'products.json');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// Helper function to read products from file
function readProducts() {
    try {
        if (!fs.existsSync(PRODUCTS_FILE)) {
            return [];
        }
        const data = fs.readFileSync(PRODUCTS_FILE, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error('Error reading products file:', error);
        return [];
    }
}

// Helper function to write products to file
function writeProducts(products) {
    try {
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
    } catch (error) {
        console.error('Error writing products file:', error);
    }
}

// Routes
app.get('/api/products', (req, res) => {
    const products = readProducts();
    res.json(products);
});

app.post('/api/products', (req, res) => {
    const products = readProducts();
    const newProduct = {
        id: Date.now(),
        name: req.body.name,
        specs: req.body.specs,
        price: req.body.price,
        image: req.body.image
    };
    products.push(newProduct);
    writeProducts(products);
    res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
    const products = readProducts();
    const id = parseInt(req.params.id);
    const index = products.findIndex(product => product.id === id);
    if (index !== -1) {
        products.splice(index, 1);
        writeProducts(products);
        res.status(200).json({ message: 'Product deleted successfully' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
