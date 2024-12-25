const express = require("express");
const router = express.Router();


const { createCategory, getCategories } = require("../controllers/CategoryController");

router.post('/categories', createCategory);
router.get('/categories/getcategories/',getCategories)


module.exports = router;
