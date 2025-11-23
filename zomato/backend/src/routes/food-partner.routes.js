const express = require("express");
const foodPartnerController = require("../controllers/food-partner.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const router = express.Router();

// Public endpoint: fetch a food partner and their food items by id
router.get("/:id", foodPartnerController.getFoodPartnerById);

module.exports = router;