const express = require("express");
const router = express.Router();
const Order = require("../models/orders")
router.post('/orderData', async(req,res) =>{
    let data = req.body.order_data
    await data.splice(0,0,{Order_date:req.body.order_date})
    await data.splice(0,0,{order_amt:req.body.order_amt})
    console.log("1231242343242354",req.body.phone)

    //if email not exisitng in db then create: else: InsertMany()
    let eId = await Order.findOne({ 'phone': req.body.phone })    
    console.log(eId);

    if (eId===null) {
        try {
            console.log(data)
            console.log("1231242343242354",req.body.phone)
            await Order.create({
                phone: req.body.phone,
                order_data:[data],
            }).then(() => {
                res.json({ success: true })
            })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)

        }
    }

    else {
        try {
            await Order.findOneAndUpdate({phone:req.body.phone},
                { $push:{order_data: data} }).then(() => {
                    res.json({ success: true })
                })
        } catch (error) {
            console.log(error.message)
            res.send("Server Error", error.message)
        }
    }
})

router.post('/myorderData', async(req,res) =>{
     try {
        let myData = await Order.findOne({
            'phone': req.body.phone
        }
        )
        console.log("myData",myData)
        res.json({orderData:myData})

     } catch (error) {
        console.log(error.message)
        res.send("Server Error", error.message)
     }
}
)
module.exports = router;