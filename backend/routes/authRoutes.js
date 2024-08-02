const authControllers = require("../controllers/authControllers");
const { authMiddleware } = require("../middlewares/authMiddleware");
const router = require("express").Router();

router.post("/admin-login", authControllers.adminLogin);
router.get("/get-user", authMiddleware, authControllers.getUser);
router.post("/seller-register", authControllers.sellerRegister);

module.exports = router;
