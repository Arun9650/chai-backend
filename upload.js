import fs from 'fs';
import mongoose from 'mongoose';
// const Product = require('./src/models/product.model'); // Import the schema
import  Product from './src/models/product.model.js';
// Load data from JSON file
const products = JSON.parse(fs.readFileSync('product.json', 'utf8'));

// Connect to MongoDB
const url = 'mongodb+srv://ArunKumar:ArunKumar@cluster0.giujeng.mongodb.net/videotube'
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

async function uploadData() {
  try {
    console.log('Connected to MongoDB');

    // Insert data into MongoDB collection
    await Product.insertMany(products);

    console.log('Data uploaded successfully');
  } catch (err) {
    console.error('Error uploading data:', err);
  } finally {
    mongoose.connection.close();
  }
}

uploadData();