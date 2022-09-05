const { Prisma } = require("@prisma/client")
const prisma = require('../utils/prisma')

const findUserById = async (userId) => {
    return(
        await prisma.user.findUnique({
            where: {
              id: userId
            },
        })
    )
}

const findPostsByTitle = async (title) => {
    return(
        await prisma.post.findUnique({
            where: {
                title: title
            }
        })
    )
}

module.exports = {
    findUserById,
    findPostsByTitle
}

