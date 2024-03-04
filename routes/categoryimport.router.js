const express = require("express");

const categories = require("../data/categories");
const category = require("../model/category.model");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    await category.deleteMany({});
    const categoriesInDB = await category.insertMany(categories.data);
    res.json(categoriesInDB);
  } catch (err) {
    console.log(err);
    res.json({ message: "Could not add categories to DB" });
  }
});

module.exports = router;
