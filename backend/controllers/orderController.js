const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

exports.createOrder = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id })
    .populate("items.product");

  if (!cart)
    return res.status(400).json({ message: "Cart empty" });

  let total = 0;

  cart.items.forEach(item => {
    total += item.quantity * item.product.price;
  });

  const order = await Order.create({
    user: req.user._id,
    items: cart.items,
    totalPrice: total
  });

  await Cart.deleteOne({ user: req.user._id });

  res.json(order);
};
