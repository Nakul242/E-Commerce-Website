const mongoose = require("mongoose");
const Product = require("./models/Product");

mongoose.connect("mongodb://127.0.0.1:27017/ecommerce")
  .then(() => console.log("MongoDB Connected for Seeding"))
  .catch(err => console.log(err));

const products = [
  {
    name: "Wireless Headphones",
    description: "High-quality noise-cancelling wireless headphones with 20h battery life.",
    price: 3499,
    category: "Electronics",
    stock: 50,
    image: "https://m.media-amazon.com/images/I/61CGHv6kmWL._SL1500_.jpg"
  },
  {
    name: "Smart Watch Series 5",
    description: "Track your fitness, heart rate, and notifications on the go.",
    price: 4999,
    category: "Electronics",
    stock: 30,
    image: "https://m.media-amazon.com/images/I/71Swqqe7XAL._SL1500_.jpg"
  },
  {
    name: "Running Shoes",
    description: "Lightweight and breathable running shoes for daily workouts.",
    price: 2499,
    category: "Fashion",
    stock: 100,
    image: "https://m.media-amazon.com/images/I/61utX8kBDlL._UY695_.jpg"
  },
  {
    name: "Leather Wallet",
    description: "Genuine leather wallet with multiple card slots.",
    price: 899,
    category: "Fashion",
    stock: 200,
    image: "https://m.media-amazon.com/images/I/71pWzhdJNwL._UL1500_.jpg"
  },
  {
    name: "Gaming Mouse",
    description: "RGB gaming mouse with adjustable DPI and ergonomic design.",
    price: 1299,
    category: "Electronics",
    stock: 45,
    image: "https://m.media-amazon.com/images/I/61mpMH5TzkL._SL1500_.jpg"
  },
  {
    name: "Mechanical Keyboard",
    description: "Clicky blue switches with customizable RGB backlighting.",
    price: 3999,
    category: "Electronics",
    stock: 25,
    image: "https://m.media-amazon.com/images/I/71kr3WAj1FL._SL1500_.jpg"
  },
  {
    name: "Cotton T-Shirt",
    description: "100% cotton basic t-shirt, available in multiple colors.",
    price: 499,
    category: "Fashion",
    stock: 150,
    image: "https://m.media-amazon.com/images/I/71g+fWl5mLL._UY741_.jpg"
  },
  {
    name: "Denim Jeans",
    description: "Slim fit denim jeans with stretch comfort.",
    price: 1999,
    category: "Fashion",
    stock: 80,
    image: "https://m.media-amazon.com/images/I/61h8iC3WcHL._UY879_.jpg"
  },
  {
    name: "Backpack",
    description: "Water-resistant backpack with laptop compartment.",
    price: 1599,
    category: "Accessories",
    stock: 60,
    image: "https://m.media-amazon.com/images/I/81vpsIs58WL._SL1500_.jpg"
  },
  {
    name: "Sunglasses",
    description: "UV protection sunglasses with polarized lenses.",
    price: 999,
    category: "Accessories",
    stock: 120,
    image: "https://m.media-amazon.com/images/I/61p3G4dR2LL._UL1500_.jpg"
  },
  {
    name: "4K Monitor",
    description: "27-inch 4K UHD monitor with IPS panel.",
    price: 24999,
    category: "Electronics",
    stock: 15,
    image: "https://m.media-amazon.com/images/I/81QpkIctqPL._SL1500_.jpg"
  },
  {
    name: "Bluetooth Speaker",
    description: "Portable waterproof speaker with deep bass.",
    price: 2999,
    category: "Electronics",
    stock: 40,
    image: "https://m.media-amazon.com/images/I/71gLalG8wGL._SL1500_.jpg"
  }
];

const seedDB = async () => {
  try {
    await Product.deleteMany({});
    console.log("Existing products removed");

    await Product.insertMany(products);
    console.log("New products added with stable images");

  } catch (error) {
    console.log(error);
  } finally {
    mongoose.connection.close();
    console.log("Database connection closed");
  }
};

seedDB();
