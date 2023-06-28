const express=require("express")
const { addOder, getOrder, deleteOrder, getSingleOrder, userOrder, todaysOrder, getTodaysOrder, getTomorrowsOrder, getYesterdaysOrder } = require("../Controller/order.controller")
const { auth } = require("../Middleware/auth.middleware")
const order=express.Router()
order.post("/addorder",auth,addOder)
order.get("/gettodaysorder",getTodaysOrder)
order.get("/gettomorrowsorder",getTomorrowsOrder)
order.get("/getyesterdaysorder",getYesterdaysOrder)
order.get("/getorder",auth,getOrder)
order.get("/:id",auth,getSingleOrder)
order.delete("/:orderId",deleteOrder)
order.get("/userorder/:id",userOrder)

module.exports={order}