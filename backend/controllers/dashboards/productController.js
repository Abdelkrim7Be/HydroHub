const formidable = require("formidable");
const { responseReturn } = require("../../utilities/response");
const cloudinary = require("cloudinary").v2;
const productModel = require("../../models/productModel");

class productController {
  addProduct = async (req, res) => {
    const { id } = req;
    const form = formidable({ multiples: true });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return responseReturn(res, 400, { error: "Form parsing error" });
      }

      // Handle both single and multiple file uploads
      let images = files.images;
      if (!Array.isArray(images)) {
        images = [images]; // Convert to array if it's a single file
      }
      let {
        name,
        category,
        description,
        stock,
        price,
        discount,
        shopName,
        brand,
      } = fields;
      name = name.trim();
      const slug = name.split(" ").join("-");

      cloudinary.config({
        cloud_name: process.env.cloud_name,
        api_key: process.env.api_key,
        api_secret: process.env.api_secret,
        secure: true,
      });
      try {
        let allImageUrl = [];
        for (let i = 0; i < images.length; i++) {
          const result = await cloudinary.uploader.upload(images[i].filepath, {
            folder: "products",
          });
          allImageUrl = [...allImageUrl, result.url];
        }
        const product = await productModel.create({
          sellerId: id,
          name,
          slug,
          brand: brand.trim(),
          shopName,
          category: category.trim(),
          description: description.trim(),
          stock: parseInt(stock),
          price: parseInt(price),
          discount: parseInt(discount),
          images: allImageUrl,
        });
        responseReturn(res, 201, {
          product,
          message: "Product added successfully",
        });
      } catch (error) {
        responseReturn(res, 500, { error: error.message });
      }
    });
  };

  getProducts = async (req, res) => {
    // console.log(req.query);
    // console.log(req.id);
    const { page, searchValue, perPage } = req.query;
    const { id } = req;
    let skipPage = "";
    skipPage = parseInt(perPage) * (parseInt(page) - 1);
    try {
      if (searchValue) {
        const products = await productModel
          .find({
            // depend on what u did as an index
            $text: { $search: searchValue },
            sellerId: id,
          })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalProducts = await productModel
          .find({
            $text: { $search: searchValue },
            sellerId: id,
          })
          .countDocuments();
        responseReturn(res, 200, { products, totalProducts });
      } else {
        const products = await productModel
          .find({ sellerId: id })
          .skip(skipPage)
          .limit(perPage)
          .sort({ createdAt: -1 });
        const totalProducts = await productModel
          .find({ sellerId: id })
          .countDocuments();
        responseReturn(res, 200, { products, totalProducts });
      }
    } catch (error) {
      console.log(error.message);
    }
  };
}

module.exports = new productController();
