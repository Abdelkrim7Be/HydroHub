const productController = require("../../controllers/dashboards/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);
router.get("/get-products", authMiddleware, productController.getProducts);
router.get(
  "/get-product/:productId",
  authMiddleware,
  productController.getProduct
);
router.post("/update-product", authMiddleware, productController.updateProduct);

module.exports = router;
