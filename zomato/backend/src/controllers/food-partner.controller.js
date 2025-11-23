const foodPartnerModel = require("../models/foodpartner.model")
const foodModel = require("../models/food.model");

async function getFoodPartnerById(req, res) {
    const { id } = req.params;
        try {
            console.log("getFoodPartnerById called with id:", id);
            // the food model uses field name `foodPartner` (ObjectId ref), ensure we query that
            const foodItemByfoodPartner = await foodModel.find({ foodPartner: id });
            console.log(`Found ${foodItemByfoodPartner.length} food items for partner ${id}`);
        const foodPartner = await foodPartnerModel.findById(id);
            console.log("foodPartner lookup result:", !!foodPartner);
        if (!foodPartner) {
                console.warn(`Food partner with id ${id} not found`);
                return res.status(404).json({ message: "Food partner not found" });
        }

        // normalize food items to include consistent keys used on frontend:
        // - videoUrl is used by Reels components
        // - foodPartnerId is convenient for linking to the partner page
        const normalizedFoodItems = foodItemByfoodPartner.map(item => ({
            ...item.toObject(),
            videoUrl: item.video,
            foodPartnerId: item.foodPartner
        }));

        // return a consistent payload: { foodPartner, foodItems }
        return res.status(200).json({ foodPartner: foodPartner.toObject(), foodItems: normalizedFoodItems });
    } catch (error) {
        console.error("Error fetching food partner:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { getFoodPartnerById };