const express = require("express");
const router = express.Router();

router.post('/foodData', (req,res)=>{
    try {
        console.log(global.items);
        res.send([global.items])
    } catch (error) {
        console.log(error.message);
        res.send("server error");

    }
})


module.exports = router;