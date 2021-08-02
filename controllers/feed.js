const User = require("../models/user");
const Post = require("../models/post");
const Comment = require("../models/comment");
const Organization = require("../models/organization");

exports.getPosts = async (req, res, next) => {
  // Get query params if given
  const page = req.query.page;
  const perPage = req.query.perPage;
  // TODO: Add fetching of top comment for every post
  try {
    // Add options to customize return:
    // Depends on query params, so grab those with checks
    const user = await User.find(req.userId);
    const organization = await Organization.findById(
      user.organization
    ).populate("feed");

    // filters / pagination / sorting here
    const posts = organization.feed.slice((page - 1) * perPage, page * perPage);

    const comments = [];
    // Fetch the top 1 comment for each post fetches by upvotes for now
    posts.forEach((post) => {
      const top_comment = Comment.find({ post: post }).sort({ upvotes: -1 });
      comments.push(top_comment);
    });

    // Return resulting list of posts as is
    return res.status(200).json({
      message: "Posts fetched",
      posts,
      comments,
    });
  } catch (err) {
    if (!err.status) {
      // Set internal server error
      err.status = 500;
    }
    next(err);
  }
};

exports.getPost = async (req, res, next) => {
  const postId = req.body.postId;
  // TODO: Verify the post you're viewing is from your org
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const err = new Error("Could not find post specified");
      err.status = 404;
      throw err;
    }
    // Get comments
    const comments = await Comment.find({ post: postId });
    return res.status(200).json({
      message: "Post Fetched",
      post,
      comments,
    });
  } catch (err) {
    if (!err.status) {
      // Set internal server error
      err.status = 500;
    }
    next(err);
  }
};

exports.createPost = async (req, res, next) => {
  // Get body params (might change approach if form data)
  // Requires isAuth middleware before route is called
  // Add image upload support
  const title = req.body.title;
  const content = req.body.content;
  let creator = req.userId;
  const imageUrl = req.body.imageUrl;

  // Run validation check

  // create
  const post = new Post({
    title,
    content,
    imageUrl,
    author: creator,
  });
  // Add post to users post list as well
  try {
    await post.save();
    creator = await User.findById(creator);
    let organization = await Organization.findById(creator.organization);
    organization.feed.push(post);
    creator.posts.push(post);

    await organization.save();
    await creator.save();
    return res.status(201).json({
      message: "Post created successfully",
      post,
      creator: { _id: creator._id, first_name: creator.first_name },
    });
  } catch (err) {
    if (!err.status) {
      // Set internal server error
      err.status = 500;
    }
    next(err);
  }
};

exports.updatePost = async (req, res, next) => {
  const postId = req.params.postId;
  const title = req.body.title;
  const content = req.body.content;
  const imageUrl = req.body.imageUrl;
  // Parse Validation errors

  // Update Post
  try {
    const post = await Post.findById(postId).populate("creator");
    if (!post) {
      const err = new Error(
        "Could not find requested post. May have been deleted"
      );
      err.status = 404;
      throw err;
    }
    if (post.creator._id.toString() !== req.userId.toString()) {
      const err = new Error("Not authorized to update this post.");
      err.status = 403;
      throw err;
    }
    // Save Post
    post.title = title;
    post.content = content;
    post.imageUrl = imageUrl;

    // Return updated post
    let result = await post.save();
    return res.status(200).json({
      message: "Updated post",
      post: result,
    });
  } catch (err) {
    if (!err.status) {
      // Set internal server error
      err.status = 500;
    }
    next(err);
  }
};

exports.deletePost = async (req, res, next) => {
  const postId = req.params.postId;
  // TODO: Delete all comments associated with the post as well
  try {
    const post = await Post.findById(postId);
    if (!post) {
      const err = new Error("Unable to find post, may already be deleted");
      err.status = 404;
      throw err;
    }
    if (post.creator.toString() !== req.userId.toString()) {
      const err = new Error("Not authorized to delete this post.");
      err.status = 403;
      throw err;
    }

    await Post.findByIdAndRemove(post._id);
    const user = await User.findById(req.userId);
    const org = await Organization.findById(user.organization);
    org.feed.pull(postId);
    user.posts.pull(postId);
    await org.save();
    await user.save();
    return res.status(200).json({
      message: "Post deleted Successfully",
    });
  } catch (err) {
    if (!err.status) {
      // Set internal server error
      err.status = 500;
    }
    next(err);
  }
};

// TODO: Add routes to add comment, add replies to comments, edit comment, add upvote/downvote, etc.
