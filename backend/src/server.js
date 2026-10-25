const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Serve frontend static UI
app.use(express.static(path.join(__dirname, '../../frontend')));

// Serve photos stored in the /images folder
app.use('/images', express.static(path.join(__dirname, '../../images')));

// Sample product catalog
const products = [
  {
    id: 1,
    name: "Classic Leather Jacket",
    price: 129.99,
    description: "Premium handcrafted genuine leather jacket.",
    image: "/images/Gemini_Generated_Image_w5n52uw5n52uw5n5.png"
  },
  {
    id: 2,
    name: "Urban Runner Sneakers",
    price: 89.99,
    description: "High-cushion lightweight running sneakers.",
    image: "/images/Gemini_Generated_Image_w5n52uw5n52uw5n5 (1).png"
  }
];

// Health check endpoint (for AWS monitoring / load balancers)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', uptime: process.uptime() });
});

// Products API endpoint
app.get('/api/products', (req, res) => {
  res.status(200).json(products);
});

// Place order endpoint
app.post('/api/orders', (req, res) => {
  const { cartItems } = req.body;
  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }

  const orderId = `ORD-${Date.now()}`;
  res.status(201).json({
    message: 'Order placed successfully!',
    orderId,
    totalItems: cartItems.length
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
