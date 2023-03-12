const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const paymentType = require("../middleware/paymentType")

const router = express.Router()

router.use(requireAuth)
router.post("/:type", paymentType)

module.exports = router
