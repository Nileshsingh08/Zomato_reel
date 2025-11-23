const express = require("express");
const foodController = require("../controllers/food.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();
const multer = require("multer");


const upload = multer({ storage: multer.memoryStorage() });

//create food item
router.post("/", authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood);

router.get("/", foodController.getAllFoodItems );



module.exports = router;