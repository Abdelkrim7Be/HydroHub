const sellerController = require("../../controllers/dashboards/sellerController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.get(
  "/get-seller-request",
  authMiddleware,
  sellerController.gettingSellerRequest
);
router.get(
  "/get-seller/:sellerId",
  authMiddleware,
  sellerController.gettingSeller
);
router.post(
  "/update-seller-status",
  authMiddleware,
  sellerController.updateSellerStatus
);
router.get("/get-sellers", authMiddleware, sellerController.getActiveSellers);
router.get(
  "/get-inactive-sellers",
  authMiddleware,
  sellerController.getInactiveSellers
);

module.exports = router;
