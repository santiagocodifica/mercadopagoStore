const express = require("express")

const { getAllProducts, getProductsById, getOneProduct, create_product, update_product, delete_product } = require("../controllers/productController")
const requireAuth = require("../middleware/requireAuth")
const requireAdminAuth = require("../middleware/requireAdminAuth")

const router = express.Router()

router.get("/all", getAllProducts)
router.get("/byId", getProductsById)
router.get("/one/:id", getOneProduct)

router.use(requireAuth)
router.use(requireAdminAuth)

router.post("/", create_product) // create_product
router.patch("/:id", update_product) // update_product
router.delete("/:id", delete_product) // delete_product

router.post("/image") // add_image
router.patch("/image") // update_image
router.delete("/image/:type/:id") // delete_image

module.exports = router
