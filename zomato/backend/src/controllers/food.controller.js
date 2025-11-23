const foodModel = require("../models/food.model");
const route = require("express").Router();
const storageService = require("../services/storage.service");
const {v4: uuid}= require("uuid");

async function createFood(req, res) {
    console.log("Inside create food controller");
    try {
        // validate authenticated food partner
        if (!req.foodPartner || !req.foodPartner._id) {
            return res.status(401).json({ message: 'Unauthorized: food partner not found on request' });
        }

        // ensure file was uploaded
        if (!req.file || !req.file.buffer) {
            return res.status(400).json({ message: 'No video file uploaded' });
        }

        console.log("Request file:", { originalname: req.file.originalname, size: req.file.size });

        // upload to storage service - wrap in try/catch to capture upload errors
        let fileUploadResult;
        try {
            // pass mime type so storage service can add proper data URI prefix
            fileUploadResult = await storageService.uploadFile(
                req.file.buffer.toString('base64'),
                uuid(),
                req.file.mimetype
            );
        } catch (uploadErr) {
            console.error('Error uploading file to storage service:', uploadErr);
            return res.status(502).json({ message: 'Failed to upload video to storage service', details: uploadErr.message });
        }

        console.log('File upload result:', fileUploadResult);

        const foodItem = await foodModel.create({
            name: req.body.name,
            video: fileUploadResult.url,
            description: req.body.description,
            foodPartner: req.foodPartner._id
        });

        return res.status(201).json({
            message: 'Food item created successfully',
            food: foodItem
        });
    } catch (error) {
        console.error('Error in createFood controller:', error);
        return res.status(500).json({ message: 'Internal server error', details: error.message });
    }
}
async function getAllFoodItems(req, res) {
    const foodItems = await foodModel.find();
    // normalize the items so frontend can rely on `videoUrl` and `foodPartnerId`
    const normalizedFood = foodItems.map(item => ({
        ...item.toObject(),
        videoUrl: item.video,
        foodPartnerId: item.foodPartner
    }));

    res.status(200).json({
        message: "Food items retrieved successfully",
        food: normalizedFood
    });
}

module.exports = { createFood , getAllFoodItems };