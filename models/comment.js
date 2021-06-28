const { Schema, model } = require("mongoose");

const comment = new Schema(
  {
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    upvotes: {
      type: Number,
      default: 0,
    },
    downvotes: {
      type: Number,
      default: 0,
    }
  },
  { timestamps: true }
);

module.exports = model("Comment", comment);
