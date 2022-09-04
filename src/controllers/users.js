const { Prisma } = require("@prisma/client");
const prisma = require("../utils/prisma");

const { messages } = require("../utils/utils");

const getAllUsers = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  });

  res.status(200).json({
    users,
  });
};

const createNewUser = async (req, res) => {
  console.log("new user");

  const { username, email, password, firstName, lastName, age, pictureUrl } =
    req.body;

  if (
    !username ||
    !email ||
    !password ||
    !firstName ||
    !lastName ||
    !age ||
    !pictureUrl
  ) {
    return res.status(400).json({
      error: "Missing fields in request body",
    });
  }

  try {
    const createdUser = await prisma.user.create({
      data: {
        username,
        email,
        password,
        profile: {
          create: {
            firstName,
            lastName,
            age,
            pictureUrl,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(201).json({ user: createdUser });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return res.status(409).json({ error: messages.userExists });
      }
    }

    res.status(500).json({ error: "500" });
  }
};

const updateUserById = async (req, res) => {
  console.log("updaing user");
  const userId = parseInt(req.params.id);
  console.log("userid", userId);

  const { username, email, password, firstName, lastName, age, pictureUrl } =
    req.body;

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!user) {
    res.status(404).json({ error: messages.userIdNotFound });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username,
        email,
        password,
        profile: {
          update: {
            firstName,
            lastName,
            age,
            pictureUrl,
          },
        },
      },
      include: {
        profile: true,
      },
    });

    res.status(201).json({ user: updatedUser });
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2001") {
        return res.status(409).json({ error: messages.userExists });
      }
    }

  }
  res.status(500).json({ error: "500" });
};

const deleteUser = async (req, res) => {
  console.log("deleting new");
  const userId = parseInt(req.params.id);

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });
  console.log("user", user);

  if (!user) {
    res.status(404).json({ error: messages.userIdNotFound });
  }

  console.log("userid", userId);

  const deletedPost = await prisma.post.delete({
    where: {
      id: userId,
    },
  })

  const deletedProfile = await prisma.profile.delete({
    where: {
      id: userId,
    },

  });

  const deletedUser = await prisma.user.delete({
    where: {
      id: userId
    }
  })

  res.status(201).json({ user: deletedUser });
};

module.exports = {
  getAllUsers,
  createNewUser,
  updateUserById,
  deleteUser,
};
