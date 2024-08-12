const productController = require("../../controllers/dashboards/productController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/add-product", authMiddleware, productController.addProduct);

module.exports = router;
