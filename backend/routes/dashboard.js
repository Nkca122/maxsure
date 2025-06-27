const express = require("express")
const router = express.Router()
let dashboardControllers = require("../controllers/dashboard")

dashboardControllers.map((controller) => {
    router[`${controller.method}`](`${controller.route}`, ...controller.middlewares, controller.fn)
})

module.exports = router