const express = require('express');
const router = express.Router();
const { createUser, listUser, updateUser, deleteUser, userLogin} = require("../controllers/UserController.js");
const { adminMiddleware } = require('../controllers/middleware.js');

router.get("/", (req, res) => {
    res.send("hello from get router")
});

router.post("/add-user", createUser);

router.post("/login", userLogin);

router.get("/list-user", listUser);

router.put("/update-user/:id", updateUser)

router.delete("/delete-user/:id", deleteUser)

module.exports = router;