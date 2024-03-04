const express = require("express");

const wishlistController = require("../controllers/wishlistController");

const verifyUser = require("../middleware/verifyUser");

const { createWishlistHandler, deleteWishlistHandler, getWishlistHandler } =
  wishlistController;
const router = express.Router();

router.route("/").post(verifyUser, createWishlistHandler);

router.route("/:id").delete(verifyUser, deleteWishlistHandler);

router.route("/").get(verifyUser, getWishlistHandler);

module.exports = router;
