const adminModel = require("../models/adminModel");
const sellerModel = require("../models/sellerModel");
const sellerCustomerModel = require("../models/chat/sellerCustomerModel");
const { createToken } = require("../utilities/tokenCreate");
const formidable = require("formidable");
const { responseReturn } = require("../utilities/response");
const cloudinary = require("cloudinary").v2;
const bcrypt = require("bcrypt");
const { response } = require("express");

class authControllers {
  adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const admin = await adminModel.findOne({ email }).select("+password");
      // console.log(admin);
      if (admin) {
        const match = await bcrypt.compare(password, admin.password);
        // console.log(match);
        if (match) {
          const token = await createToken({
            id: admin.id,
            role: admin.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, {
            token,
            message: "Successful Login",
          });
        } else {
          responseReturn(res, 404, { error: "Wrong Password" });
        }
      } else {
        responseReturn(res, 404, { error: "Email Not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  sellerLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
      const seller = await sellerModel.findOne({ email }).select("+password");
      // console.log(seller);
      if (seller) {
        const match = await bcrypt.compare(password, seller.password);
        // console.log(match);
        if (match) {
          const token = await createToken({
            id: seller.id,
            role: seller.role,
          });
          res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
          });
          responseReturn(res, 200, {
            token,
            message: "Successful Login",
          });
        } else {
          responseReturn(res, 404, { error: "Wrong Password" });
        }
      } else {
        responseReturn(res, 404, { error: "Email Not Found" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };

  sellerRegister = async (req, res) => {
    const { name, email, password } = req.body;
    try {
      const getUser = await sellerModel.findOne({ email });
      if (getUser) {
        responseReturn(res, 404, { error: "Email Already Exists" });
      } else {
        const seller = await sellerModel.create({
          name,
          email,
          password: await bcrypt.hash(password, 10),
          method: "manually",
          shopInfo: {},
        });
        await sellerCustomerModel.create({
          myId: seller._id,
        });

        const token = await createToken({
          id: seller._id,
          role: seller.role,
        });
        res.cookie("accessToken", token, {
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        });
        responseReturn(res, 201, { token, message: "Register Success" });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  getUser = async (req, res) => {
    const { id, role } = req;
    try {
      if (role === "admin") {
        const user = await adminModel.findById(id);
        responseReturn(res, 200, { userInfo: user });
      } else {
        const seller = await sellerModel.findById(id);
        responseReturn(res, 200, { userInfo: seller });
      }
    } catch (error) {
      responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };
  uploadingProfileImage = async (req, res) => {
    const { id, role } = req;
    const form = formidable({ multiple: true });

    form.parse(req, async (err, _, files) => {
      if (err) {
        return responseReturn(res, 400, {
          error: "Error parsing the form data",
        });
      }

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });

      const { image } = files;

      try {
        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "profile",
        });

        if (result) {
          let userInfo;
          if (role === "admin") {
            await adminModel.findByIdAndUpdate(id, {
              image: result.url,
            });
            userInfo = await adminModel.findById(id);
          } else if (role === "seller") {
            await sellerModel.findByIdAndUpdate(id, {
              image: result.url,
            });
            userInfo = await sellerModel.findById(id);
          } else {
            return responseReturn(res, 400, {
              error: "Invalid role specified",
            });
          }

          responseReturn(res, 201, {
            message: "Profile Image Uploaded successfully",
            userInfo,
          });
        } else {
          responseReturn(res, 404, { error: "Image Upload Failed" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };
  addingProfileInfo = async (req, res) => {
    const { shopName, divisionName, districtName, region } = req.body;
    const { id } = req;

    try {
      await sellerModel.findByIdAndUpdate(id, {
        shopInfo: {
          shopName,
          divisionName,
          districtName,
          region,
        },
      });
      const userInfo = await sellerModel.findById(id);
      responseReturn(res, 201, {
        message: "Profile Info Added Successfully",
        userInfo,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
  changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { id, role } = req;

    try {
      let userModel;
      if (role === "admin") {
        userModel = adminModel;
      } else if (role === "seller") {
        userModel = sellerModel;
      } else {
        responseReturn(res, 403, { message: "Unauthorized access" });
      }

      const user = await userModel.findById(id);
      // console.log(user);
      if (!user) {
        responseReturn(res, 404, { message: "User not found" });
      }

      const match = await bcrypt.compare(currentPassword, user.password);
      if (!match) {
        responseReturn(res, 400, {
          message: "Current password is incorrect",
        });
      }

      user.password = await bcrypt.hash(newPassword, 12);
      await user.save();

      responseReturn(res, 200, {
        message: "Password changed successfully",
      });
    } catch (error) {
      responseReturn(res, 500, { message: "Server error" });
    }
  };
}

module.exports = new authControllers();
