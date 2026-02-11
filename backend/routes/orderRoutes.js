const router = require("express").Router();
const { createOrder } = require("../controllers/orderController");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, createOrder);

module.exports = router;
