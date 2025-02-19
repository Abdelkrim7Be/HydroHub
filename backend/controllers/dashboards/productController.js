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

  getProduct = async (req, res) => {
    const { productId } = req.params;
    try {
      const product = await productModel.findById(productId);
      responseReturn(res, 200, { product });
    } catch (error) {
      console.log(error.message);
    }
  };
  updateProduct = async (req, res) => {
    let { name, description, discount, price, brand, stock, productId } =
      req.body;
    name = name.trim();
    const slug = name.split(" ").join("-");
    try {
      await productModel.findByIdAndUpdate(productId, {
        name,
        description,
        discount,
        price,
        brand,
        stock,
        productId,
        slug,
      });
      const product = await productModel.findById(productId);
      responseReturn(res, 200, {
        product,
        message: "Product Updated successfully",
      });
    } catch (error) {
      responseReturn(res, 500, {
        error: error.message,
      });
    }
  };
  updateProductImage = async (req, res) => {
    const form = formidable({ multiples: true });
    form.parse(req, async (err, field, files) => {
      const { oldImage, productId } = field;
      const { newImage } = files;

      if (err) {
        responseReturn(res, 400, { error: err.message });
      } else {
        try {
          cloudinary.config({
            cloud_name: process.env.cloud_name,
            api_key: process.env.api_key,
            api_secret: process.env.api_secret,
            secure: true,
          });

          const result = await cloudinary.uploader.upload(newImage.filepath, {
            folder: "products",
          });

          if (result) {
            let { images } = await productModel.findById(productId);
            const index = images.findIndex((img) => img === oldImage);
            images[index] = result.url;
            await productModel.findByIdAndUpdate(productId, { images });

            const product = await productModel.findById(productId);
            responseReturn(res, 200, {
              product,
              message: "Product Image Updated successfully",
            });
          } else {
            responseReturn(res, 404, { error: "Image Upload Failed" });
          }
        } catch (error) {
          responseReturn(res, 404, { error: error.message });
        }
      }
    });
  };

  getDiscountProducts = async (req, res) => {
    const { page, searchValue, perPage } = req.query;
    const { id } = req;
    let skipPage = parseInt(perPage) * (parseInt(page) - 1);

    try {
      const query = { sellerId: id, discount: { $gt: 0 } }; // Filter for products with discount > 0

      if (searchValue) {
        query.$text = { $search: searchValue };
      }

      const products = await productModel
        .find(query)
        .skip(skipPage)
        .limit(perPage)
        .sort({ createdAt: -1 });

      const totalProducts = await productModel.countDocuments(query); // Count filtered products

      responseReturn(res, 200, { products, totalProducts });
    } catch (error) {
      console.log(error.message);
      responseReturn(res, 500, { error: error.message });
    }
  };
  deletingProduct = async (req, res) => {
    try {
      const { id } = req.params;
      const deletedProduct = await productModel.findByIdAndDelete(id);

      if (!deletedProduct) {
        responseReturn(res, 404, { message: "Product not found" });
      }

      responseReturn(res, 200, {
        message: "Product deleted successfully",
        productId: id,
      });
    } catch (error) {
      responseReturn(res, 500, { error: error.message });
    }
  };
}

module.exports = new productController();
