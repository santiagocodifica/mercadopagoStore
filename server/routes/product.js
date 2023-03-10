const express = require("express")

const { getAllProducts, getProductsById, getOneProduct } = require("../controllers/productController")

const router = express.Router()

router.get("/all", getAllProducts)
router.get("/byId", getProductsById)
router.get("/one/:id", getOneProduct)

module.exports = router
