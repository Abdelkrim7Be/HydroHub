const authControllers = require("../controllers/authControllers");
const router = require("express").Router();

router.post("/admin-login", authControllers.adminLogin);

module.exports = router;
