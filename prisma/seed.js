const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function seed() {
  const createdUser = await prisma.user.create({
    data: {
      username: "Tom the Hat",
      email: "thehat@gmail.com",
      password: "strongPassword",
    },
  });
  console.log("user", createdUser);

  const createdProfile = await prisma.profile.create({
    data: {
      userId: createdUser.id,
      firstName: "Tom",
      lastName: "Brockington",
      age: 33,
      pictureUrl:
        "https://images.unsplash.com/photo-1529778873920-4da4926a72c2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&w=1000&q=80",
    },
  });
  console.log("created profile", createdProfile);

  const createdPost = await prisma.post.create({
    data: {
      title: "Being a postman looks easy!",
      content: "Wonder how much they are on? ",
      imageUrl:
        "https://image.shutterstock.com/image-photo/postman-letters-on-light-background-260nw-1776525299.jpg",
      userId: createdUser.id,
    },
  });
  console.log("created post", createdPost);
  // console.log('c user', createdUser.id);
  // console.log('c post', createdPost.id);

  const createdComment = await prisma.comment.create({
    data: {
      userId: createdUser.id,
      postId: createdPost.id,
      content: "Working on it!",
      replies: {
        create: [
          {
            userId: createdUser.id,
            postId: createdPost.id,
            content: "Soon!",
          },
        ],
      },
    },
    include: {
      replies: true,
    },
  });
  
  console.log('comment', createdComment);
  const createdCategory = await prisma.catagory.create({
    data: {
      name: "working at the carwash yea",
    },
  });

  console.log("category", createdCategory);
}

seed().catch(async (error) => {
  console.error(error);
  await prisma.$disconnect();
  process.exit(1);
});
