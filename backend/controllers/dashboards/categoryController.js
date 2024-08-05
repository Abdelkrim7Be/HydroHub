const formidable = require("formidable");
const { responseReturn } = require("../../utilities/response");
const cloudinary = require("cloudinary").v2;
const categoryModel = require("../../models/categoryModel");

class categoryController {
  addCategory = async (req, res) => {
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 404, { error: "Something Went Wrong" });
      }

      let { name } = fields;
      let { image } = files;

      if (!name || !image) {
        return responseReturn(res, 400, {
          error: "Name and image are required",
        });
      }

      try {
        name = name.trim();
        const slug = name.split(" ").join("-");

        cloudinary.config({
          cloud_name: process.env.cloud_name,
          api_key: process.env.api_key,
          api_secret: process.env.api_secret,
          secure: true,
        });

        const result = await cloudinary.uploader.upload(image.filepath, {
          folder: "categories",
        });
        if (result) {
          const category = await categoryModel.create({
            name,
            slug,
            image: result.url,
          });
          responseReturn(res, 201, {
            category,
            message: "Category added successfully",
          });
        } else {
          responseReturn(res, 404, { error: "Image Upload Failed" });
        }
      } catch (error) {
        responseReturn(res, 500, { error: "Internal Server Error" });
      }
    });
  };
  getCategory = async (req, res) => {
    console.log("this is working");
  };
}

module.exports = new categoryController();
