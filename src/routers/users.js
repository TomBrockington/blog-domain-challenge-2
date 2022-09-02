const express = require("express");
const {
    getAllUsers,
    createNewUser,
    updateUserById,
    deleteUser
} = require('../controllers/users')

const router = express.Router();

router.get("/", getAllUsers)
router.post("/", createNewUser)
router.put("/:id", updateUserById)
router.delete("/:id", deleteUser)

module.exports = router;
