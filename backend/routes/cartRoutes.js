const router = require("express").Router();
const {
  addToCart,
  getCart,
  updateQuantity,
  removeItem
} = require("../controllers/cartController");

const { protect } = require("../middleware/authMiddleware");

router.post("/add", protect, addToCart);
router.get("/", protect, getCart);
router.put("/update", protect, updateQuantity);
router.delete("/remove", protect, removeItem);

module.exports = router;
