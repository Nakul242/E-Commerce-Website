const router = require("express").Router();
const {
  createProduct,
  getProducts,
  deleteProduct,
  updateStock
} = require("../controllers/productController");

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");

router.get("/", getProducts);

// Admin only routes
router.post("/", protect, admin, createProduct);
router.delete("/:id", protect, admin, deleteProduct);
router.put("/:id/stock", protect, admin, updateStock);

module.exports = router;
