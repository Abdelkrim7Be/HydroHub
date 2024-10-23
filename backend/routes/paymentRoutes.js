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
router.get(
  "/payment/pending/:sellerId",
  authMiddleware,
  paymentController.getPendingAmounts
);
router.get(
  "/payment/withdrawed/:sellerId",
  authMiddleware,
  paymentController.getWithdrawedAmounts
);
router.get(
  "/payment/request",
  authMiddleware,
  paymentController.gettingPaymentRequest
);
router.post(
  "/payment/requestConfirm",
  authMiddleware,
  paymentController.confirmingPaymentRequest
);

module.exports = router;
