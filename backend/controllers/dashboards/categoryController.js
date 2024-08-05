const formidable = require("formidable");
const { responseReturn } = require("../../utilities/response");

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

        // responseReturn(res, 201, {
        //   message: "Category added successfully",
        //   data: { name, slug, image },
        // });
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
