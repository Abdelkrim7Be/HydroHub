const categoryController = require("../../controllers/dashboards/categoryController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/add-category", authMiddleware, categoryController.addCategory);
router.get("/get-category", authMiddleware, categoryController.getCategory);
router.get(
  "/category/:id",
  authMiddleware,
  categoryController.getCategoryById // Add this line
);

router.put(
  "/category-update/:id",
  authMiddleware,
  categoryController.updateCategory
);
router.delete(
  "/category-elete/:id",
  authMiddleware,
  categoryController.deleteCategories
);

module.exports = router;
