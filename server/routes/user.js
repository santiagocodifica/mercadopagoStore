const express = require("express")

const { signupUser, loginUser, createShippingLocation, getLocations, deleteLocation, createPayment, getPaymentData, get_user_orders } = require("../controllers/userController")
const requireAuth = require("../middleware/requireAuth")

const router = express.Router()

router.post("/login", loginUser)
router.post("/signup", signupUser)

// requires user to be logged in
router.use(requireAuth)

router.post("/shipping_location", createShippingLocation)

router.post("/create_payment", createPayment)
router.get("/get_payment_data", getPaymentData)

router.get("/get_locations", getLocations)
router.get("/orders/:id", get_user_orders)

router.delete("/delete_location/:locationId", deleteLocation)

module.exports = router
