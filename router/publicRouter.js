const express = require('express');
const { publicController } = require('../controller');
const router = express.Router();

// Halaman Produk
router.get('/getAllProducts', publicController.getAllProducts)
router.post('/addProducts', publicController.addProducts)
router.get('/deleteProducts/:idnya', publicController.deleteProducts)
router.post('/editProducts/:idnya', publicController.editProducts)

// Halaman Categories
router.get('/getAllCategories', publicController.getAllCategories)
router.get('/getAllCategoriesJoin', publicController.getAllCategoriesJoin)
router.post('/addCategories', publicController.addCategories)
router.post('/editCategories/:idnya', publicController.editCategories)
router.get('/deleteCategories/:idnya', publicController.deleteCategories)

router.get('/getAllProductCat', publicController.getAllProductCat)
router.get('/getChildrenCategories', publicController.getChildrenCategories)
router.post('/addProductCat', publicController.addProductCat)
router.get('/deleteProductCat/:idnya', publicController.deleteProductCat)

module.exports = router;