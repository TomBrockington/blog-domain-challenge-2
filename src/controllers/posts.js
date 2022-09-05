const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const { messages } = require("../utils/utils");
const { findUserById, findPostsByTitle } = require("../utils/helpers");

const createPost = async (req, res) => {
  const userId = Number(req.params.id);

  const { title, content, imageUrl, publishedAt, categories } = req.body;
  const user = await findUserById(userId);

  if (!user) {
    res.status(404).json({ error: messages.userIdNotFound });
  }

  if (!title || !content || !imageUrl || !publishedAt) {
    return res
      .status(400)
      .json({ error: "Missing fields in the request body" });
  }

  const post = await findPostsByTitle(title);

  if (post) {
    return res.status(409).json({ error: messages.postTitleAlreadyExists });
  }

  const postCategories = req.body.categories.map((cat) => {
    return {
      assignedBy: user,
      assignedAt: new Date(),
      category: {
        create: {
          name: cat.name,
        },
      },
    };
  });

  if (postCategories) {
    date = new Date();
    console.log("post found");

    const createdPost = await prisma.post.create({
      data: {
        title,
        userId: userId,
        content,
        imageUrl,
        publishedAt: date,
      },
    });
    res.status(201).json({ post: createdPost });
  } else {
    console.log("no post");
  }
};

const getPostsById = async (req, res) => {
  const page = Number(req.query.page);
  let perPage = Number(req.query.perPage);
  const userId = Number(req.params.id);

  console.log("perpage", req.query.perPage);
  console.log("perpage", perPage);

  if (isNaN(perPage)) {
    console.log("bleddy nan");
    perPage = 1;
  }
  
  console.log("perpage2", perPage);
  console.log("page", page);
  const user = await findUserById(userId);

  if (!user) {
    res.status(404).json({ error: messages.userIdNotFound });
  }

  const skip = (page - 1) * perPage;

  const foundPosts = await prisma.post.findMany({
    skip: skip,
    take: perPage,
    where: {
      userId: userId,
    },
    include: {
      category: true,
      user: {
        include: {
          profile: true,
        },
      },
      comments: true,
    },
  });

  res.status(201).json({ post: foundPosts });
};

const updatePostById = async (req, res) => {
  console.log("updating");
};

module.exports = {
  createPost,
  getPostsById,
  updatePostById,
};
