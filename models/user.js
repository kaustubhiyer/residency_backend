const { Schema, model } = require("mongoose");

const user = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    organization: {
      type: Schema.Types.ObjectId,
      required: true,
      rel: "Organization"
    },
    bio: {
      type: String,
      default: "Enter bio here",
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  { timestamps: true }
);

module.exports = model("User", user);
