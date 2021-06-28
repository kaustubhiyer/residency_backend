const { Schema, model } = require("mongoose");

const org = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    feed: [
      {
        type: Schema.Types.ObjectId,
        rel: "Post",
      }
    ],
  },
  { timestamps: true }
);

module.exports = model("Organization", org);
