const sellerModel = require("../../models/sellerModel");
const adminSellerMessage = require("../../models/chat/adminSellerMessage.js");
const { responseReturn } = require("../../utilities/response.js");

class chatController {
  // In chatController.js
  getSellers = async (req, res) => {
    try {
      const sellers = await sellerModel.find({});
      //   console.log("Sellers:", sellers); // Log sellers to verify data
      responseReturn(res, 200, { sellers });
    } catch (error) {
      //   console.log("Error fetching sellers:", error); // Log any errors
      responseReturn(res, 500, { error: "Something went wrong." });
    }
  };

  insertSellerAdminMessage = async (req, res) => {
    const { senderId, receiverId, message, senderName } = req.body;
    try {
      const messageData = await adminSellerMessage.create({
        senderId,
        receiverId,
        message,
        senderName,
      });
      responseReturn(res, 200, { message: messageData });
    } catch (error) {
      console.log(error);
    }
  };
  getAdminMessage = async (req, res) => {
    const { receiverId } = req.params;
    const id = "";

    try {
      const messages = await adminSellerMessage.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receiverId,
                },
              },
            ],
          },
        ],
      });

      let currentSeller = {};
      if (receiverId) {
        currentSeller = await sellerModel.findById(receiverId);
      }
      responseReturn(res, 200, { messages, currentSeller });
    } catch (error) {
      responseReturn(res, 500, { error: "Something went wrong." });
    }
  };
  getSellerMessage = async (req, res) => {
    const receiverId = "";
    const { id } = req;

    try {
      const messages = await adminSellerMessage.find({
        $or: [
          {
            $and: [
              {
                receiverId: { $eq: receiverId },
              },
              {
                senderId: {
                  $eq: id,
                },
              },
            ],
          },
          {
            $and: [
              {
                receiverId: { $eq: id },
              },
              {
                senderId: {
                  $eq: receiverId,
                },
              },
            ],
          },
        ],
      });

      responseReturn(res, 200, { messages });
    } catch (error) {
      responseReturn(res, 500, { error: "Something went wrong." });
    }
  };
  getLatestMessages = async (req, res) => {
    try {
      const messages = await adminSellerMessage
        .find()
        .sort({ createdAt: -1 })
        .limit(3);

      responseReturn(res, 200, { messages });
    } catch (error) {
      responseReturn(res, 500, { error: "Something went wrong." });
    }
  };
}

module.exports = new chatController();
