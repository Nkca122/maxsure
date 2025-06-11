const express = require("express")
const router = express.Router()
let botControllers = require("../controllers/bot")

botControllers.map((controller) => {
    router[`${controller.method}`](`${controller.route}`, ...controller.middlewares, controller.fn)
})

module.exports = router