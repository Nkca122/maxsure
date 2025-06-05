const express = require("express")
const router = express.Router()
let authControllers = require("../controllers/auth")

authControllers.map((controller) => {
    router[`${controller.method}`](`${controller.route}`, ...controller.middlewares, controller.fn)
})

module.exports = router