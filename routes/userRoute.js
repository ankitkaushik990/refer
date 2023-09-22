const express = require("express");
const router = express.Router();
const { signup, getall, byID, add } = require("../controlller/userController");
router.route("/signup").post(signup);
router.route("/all").get(getall);
router.route("/id").post(byID);
router.route("/set").post(add);

module.exports = router;
