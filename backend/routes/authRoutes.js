const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin-login", authControllers.adminLogin);
router.get("/get-user", authMiddleware, authControllers.getUser);
router.post("/seller-register", authControllers.sellerRegister);
router.post("/seller-login", authControllers.sellerLogin);
router.post(
  "/profile-image-upload",
  authMiddleware,
  authControllers.uploadingProfileImage
);
router.post(
  "/add-profile-info",
  authMiddleware,
  authControllers.addingProfileInfo
);
router.post("/change-password", authMiddleware, authControllers.changePassword);

module.exports = router;
