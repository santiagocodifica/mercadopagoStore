const express = require("express")
const requireAuth = require("../middleware/requireAuth")
const requireAdminAuth = require("../middleware/requireAdminAuth")
const { get_orders, get_orders_by_status, update_order_status, get_order } = require("../controllers/orderController") 

const router = express.Router()

router.use(requireAuth)
router.use(requireAdminAuth)

router.get("/", get_orders)
router.get("/byId/:id", get_order)
router.get("/byStatus/:status", get_orders_by_status)

router.patch("/", update_order_status)

module.exports = router
