const Cart = require("../models/Cart");

// ADD TO CART
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !quantity) {
      return res.status(400).json({ message: "Product and quantity required" });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: []
      });
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET CART
exports.getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart) {
      return res.json({ user: req.user._id, items: [] });
    }

    // remove deleted products
    cart.items = cart.items.filter((item) => item.product !== null);
    await cart.save();

    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE QUANTITY
exports.updateQuantity = async (req, res) => {
  try {
    const { productId, action } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (i) => i.product.toString() === productId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    if (action === "inc") item.quantity += 1;
    if (action === "dec" && item.quantity > 1) item.quantity -= 1;

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// REMOVE ITEM
exports.removeItem = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne({ user: req.user._id });

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    const updatedCart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    res.json(updatedCart);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
