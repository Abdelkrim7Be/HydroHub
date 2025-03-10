const { Schema, model } = require("mongoose");

const withdrawRequestSchema = new Schema(
  {
    sellerId: {
      type: String,
      requred: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = model("withdrawRequest", withdrawRequestSchema);
