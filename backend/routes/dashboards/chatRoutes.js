const router = require("express").Router();
const chatController = require("../../controllers/chat/chatController");
const { authMiddleware } = require("../../middlewares/authMiddleware");

router.get(
  "/chat/admin/get-sellers",
  authMiddleware,
  chatController.getSellers
);
router.post(
  "/chat/message-send-seller-admin",
  authMiddleware,
  chatController.insertSellerAdminMessage
);
router.get(
  "/chat/get-admin-messages/:receiverId",
  authMiddleware,
  chatController.getAdminMessage
);
router.get(
  "/chat/get-seller-messages",
  authMiddleware,
  chatController.getSellerMessage
);
router.get(
  "/chat/latest-messages",
  authMiddleware,
  chatController.getLatestMessages
);

module.exports = router;
