const paymentController = require("../controllers/payments/paymentController");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.get(
  "/payment/seller-payment-details/:sellerId",
  authMiddleware,
  paymentController.gettingSellerPaymentsDetails
);
router.post(
  "/payment/withdrawal-request",
  authMiddleware,
  paymentController.withdrawalRequest
);
router.get("/payment/pending/:sellerId", paymentController.getPendingAmounts);
router.get(
  "/payment/withdrawed/:sellerId",
  paymentController.getWithdrawedAmounts
);

module.exports = router;
