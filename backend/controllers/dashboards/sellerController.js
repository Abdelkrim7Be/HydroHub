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
  gettingSeller = async (req, res) => {
    const { sellerId } = req.params;
    try {
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, { seller });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  updateSellerStatus = async (req, res) => {
    const { sellerId, status } = req.body;
    console.log(status);
    try {
      await sellerModel.findByIdAndUpdate(sellerId, { status });
      const seller = await sellerModel.findById(sellerId);
      responseReturn(res, 200, {
        seller,
        message: "Seller Status Updated Successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  getActiveSellers = async (req, res) => {
    let { page, perPage, searchValue } = req.query;

    page = parseInt(page);
    perPage = parseInt(perPage);

    const skipPage = perPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "active",
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalSellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "active",
          })
          .countDocuments();

        responseReturn(res, 200, { totalSellers, sellers });
      } else {
        const sellers = await sellerModel
          .find({
            status: "active",
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalSellers = await sellerModel
          .find({
            status: "active",
          })
          .countDocuments();

        responseReturn(res, 200, { totalSellers, sellers });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  getInactiveSellers = async (req, res) => {
    let { page, perPage, searchValue } = req.query;

    page = parseInt(page);
    perPage = parseInt(perPage);

    const skipPage = perPage * (page - 1);

    try {
      if (searchValue) {
        const sellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "inactive",
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalSellers = await sellerModel
          .find({
            $text: { $search: searchValue },
            status: "inactive",
          })
          .countDocuments();

        responseReturn(res, 200, { totalSellers, sellers });
      } else {
        const sellers = await sellerModel
          .find({
            status: "inactive",
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });

        const totalSellers = await sellerModel
          .find({
            status: "inactive",
          })
          .countDocuments();

        responseReturn(res, 200, { totalSellers, sellers });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}
module.exports = new sellerController();
