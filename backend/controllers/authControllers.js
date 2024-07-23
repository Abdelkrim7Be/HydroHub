const adminModel = require("../models/adminModel");
const { responseReturn } = require("../utilities/response");

class authControllers {
  adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log(admin);
      if (admin) {
        responseReturn(res, 200, { error: "Successful Login" });
      } else {
        responseReturn(res, 404, { error: "Email Not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new authControllers();
