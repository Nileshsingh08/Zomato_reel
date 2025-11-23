const express = require('express');
const { registerUser, loginUser, logoutUser, registerFoodPartner,loginFoodPartner,logoutFoodPartner } = require('../controllers/auth.controller');

const router = express.Router();
// User API
router.post('/user/register', registerUser);
router.post('/user/login', loginUser);
router.get('/user/logout', logoutUser);

// Food Partner
// support both `/foodpartner` and `/food-partner` route variants
router.post('/foodpartner/register', registerFoodPartner);
router.post('/food-partner/register', registerFoodPartner);
router.post('/foodpartner/login', loginFoodPartner);
router.post('/food-partner/login', loginFoodPartner);
router.get('/foodpartner/logout', logoutFoodPartner);
router.get('/food-partner/logout', logoutFoodPartner);

module.exports = router;