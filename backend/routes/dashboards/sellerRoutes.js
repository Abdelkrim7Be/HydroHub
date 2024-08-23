const sellerController = require("../../controllers/dashboards/sellerController");
const { authMiddleware } = require("../../middlewares/authMiddleware");
const router = require("express").Router();

router.get(
  "/get-seller-request",
  authMiddleware,
  sellerController.gettingSellerRequest
);

module.exports = router;
