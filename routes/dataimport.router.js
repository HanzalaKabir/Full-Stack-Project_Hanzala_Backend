const express = require("express");

const hotels = require("../data/hotel");
const hotel = require("../model/hotel.model");

const router = express.Router();

router.route("/").post(async (req, res) => {
  try {
    await hotel.deleteMany({});
    const hotelsInDB = await hotel.insertMany(hotels.data);
    res.json(hotelsInDB);
  } catch (err) {
    console.log(err);
    res.json({ message: "Could not add data to DB" });
  }
});

module.exports = router;
