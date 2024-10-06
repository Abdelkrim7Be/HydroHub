const productController = require("../../controllers/dashboards/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);
router.get("/get-products", authMiddleware, productController.getProducts);
router.get(
  "/get-discount-products",
  authMiddleware,
  productController.getDiscountProducts
);
router.get(
  "/get-product/:productId",
  authMiddleware,
  productController.getProduct
);
router.post("/update-product", authMiddleware, productController.updateProduct);
router.post(
  "/update-product-image",
  authMiddleware,
  productController.updateProductImage
);
router.delete(
  "/delete-product/:id",
  authMiddleware,
  productController.deletingProduct
);

module.exports = router;
