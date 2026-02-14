const Cart = require("../models/Cart");
const Order = require("../models/Order");

// CREATE ORDER (DEMO PAYMENT)
exports.createOrder = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) =>
        sum + item.quantity * item.product.price,
      0
    );

    const order = await Order.create({
      user: req.user._id,
      items: cart.items,
      totalAmount,
      paymentId: "DEMO_PAYMENT_" + Date.now(),
      status: "paid"
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.json({
      message: "Payment successful (Demo Mode)",
      order
    });

  } catch (err) {
    res.status(500).json({ message: "Order creation failed" });
  }
};

// GET USER ORDERS
exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate("items.product")
      .sort({ createdAt: -1 });

    res.json(orders);

  } catch (err) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};
