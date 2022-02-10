const Router = require("express");
// import { Router } from "express";
const { addUser, deleteUser, deleteUsers, getUsers, updateUser } = require("./service");

const router = Router();

router.get("/users", async (req, res, next) => {
    return getUsers()
        .then((result) => {
            return res.json({ users: result });
        })
        .catch(next);
});

router.post("/users", async (req, res, next) => {
    const body = req.body;

    return addUser(body)
        .then(() => {
            return res.json({ message: "User successfully added", success: true });
        })
        .catch(next);
});

router.patch("/users/:id", async (req, res, next) => {
    const body = req.body;
    const id = req.params.id;

    return updateUser({ ...body, id })
        .then(() => {
            return res.json({ message: "User data successfully updated", success: true });
        })
        .catch(next);
});

router.delete("/users/multiple", async (req, res, next) => {
    const ids = req.body.ids;

    return deleteUsers({ ids })
        .then(() => {
            return res.json({ message: "Users successfully deleted", success: true });
        })
        .catch(next);
});

router.delete("/users/:id", async (req, res, next) => {
    const id = req.params.id;

    return deleteUser({ id })
        .then(() => {
            return res.json({ message: "User successfully deleted", success: true });
        })
        .catch(next);
});

module.exports = router;
