const Router = require("express");
const UserRoutes = require("./user/controller");

const router = Router();
router.use("/", UserRoutes);

module.exports = MainRouter;
