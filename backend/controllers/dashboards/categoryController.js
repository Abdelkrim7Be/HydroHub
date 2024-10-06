const formidable = require("formidable");
const { responseReturn } = require("../../utilities/response");
const cloudinary = require("cloudinary").v2;
const categoryModel = require("../../models/categoryModel");
const productModel = require("../../models/productModel");
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
    const { page, searchValue, perPage } = req.query;

    try {
      let skipPage = "";
      if (perPage && page) {
        skipPage = parseInt(perPage) * (parseInt(page) - 1);
      }
      if (searchValue && page && perPage) {
        const categories = await categoryModel
          .find({
            // depend on what u did as an index
            $text: { $search: searchValue },
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel
          .find({
            $text: { $search: searchValue },
          })
          .countDocuments();
        responseReturn(res, 200, { categories, totalCategory });
      } else if (searchValue === "" && page && perPage) {
        const categories = await categoryModel
          .find({})
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategory });
      } else {
        const categories = await categoryModel.find({}).sort({ createdAt: -1 });
        const totalCategory = await categoryModel.find({}).countDocuments();
        responseReturn(res, 200, { categories, totalCategory });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  updateCategory = async (req, res) => {
    const { id } = req.params;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 404, { error: "Something Went Wrong" });
      }

      let { name } = fields;
      let { image } = files;

      try {
        // Validate input
        if (!name) {
          return responseReturn(res, 400, { error: "Name is required" });
        }

        // Prepare slug
        name = name.trim();
        const slug = name.split(" ").join("-");

        // Check if there's an image and upload it
        let imageUrl;
        if (image) {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });
          const result = await cloudinary.uploader.upload(image.filepath, {
            folder: "categories",
          });
          imageUrl = result.url;
        }

        // Update category
        const updatedCategory = await categoryModel.findByIdAndUpdate(
          id,
          {
            name,
            slug,
            ...(imageUrl && { image: imageUrl }), // Update image only if a new one was provided
          },
          { new: true }
        );

        if (!updatedCategory) {
          return responseReturn(res, 404, { error: "Category not found" });
        }

        responseReturn(res, 200, {
          category: updatedCategory,
          message: "Category updated successfully",
        });
      } catch (error) {
        console.error(error.message);
        responseReturn(res, 500, { error: "Internal Server Error" });
      }
    });
  };

  // Method to get a category by ID for editing
  getCategoryById = async (req, res) => {
    const { id } = req.params;
    try {
      const category = await categoryModel.findById(id);
      if (!category) {
        return responseReturn(res, 404, { error: "Category not found" });
      }
      responseReturn(res, 200, { category });
    } catch (error) {
      return responseReturn(res, 500, { error: "Internal Server Error" });
    }
  };

  deleteCategories = async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        console.error("Category ID is undefined");
        return responseReturn(res, 400, { error: "Category ID is required" });
      }

      console.log(`Deleting category with ID: ${id}`);
      const category = await categoryModel.findById(id);
      if (!category) {
        return responseReturn(res, 404, { error: "Category not found" });
      }

      // Attempt to delete products associated with the category
      const deleteResult = await productModel.deleteMany({
        category: category.name,
      });
      console.log(
        `Deleted ${deleteResult.deletedCount} products associated with category: ${category.name}`
      );

      // Now attempt to delete the category
      await categoryModel.findByIdAndDelete(id);

      return responseReturn(res, 200, {
        message: "Category and its products deleted successfully",
        categoryId: id,
      });
    } catch (error) {
      console.error("Error deleting category:", error.message);

      if (error.code === 11000) {
        return responseReturn(res, 409, {
          error:
            "Conflict: Unable to delete the category due to existing references.",
        });
      }

      return responseReturn(res, 500, { error: "Something went wrong" });
    }
  };
}
module.exports = new categoryController();
