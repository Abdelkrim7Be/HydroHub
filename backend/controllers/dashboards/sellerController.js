const formidable = require("formidable");
const { responseReturn } = require("../../utilities/response");
const cloudinary = require("cloudinary").v2;
const sellerModel = require("../../models/sellerModel");
class sellerController {
  gettingSellerRequest = async (req, res) => {
    // console.log(req.query);
    const { page, searchValue, perPage } = req.query;
    let skipPage = "";
    if (perPage && page) {
      skipPage = parseInt(perPage) * (parseInt(page) - 1);
    }

    try {
      if (searchValue) {
      } else {
        const sellers = await sellerModel
          .find({ status: "pending" })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalSellers = await sellerModel
          .find({
            status: "pending",
          })
          .countDocuments();
        responseReturn(res, 200, { sellers, totalSellers });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}
module.exports = new sellerController();
