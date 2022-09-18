const express = require('express');
const router = express.Router();

const baseAPI = require('../../config/baseAPI.js')

const Create = require('../../interfaces/strike');
const booking = require('../../models/booking.js');
const getUserData = require('../../middlewares/getUserData.js');
const getOrderID = require('../../middlewares/getOrderID.js');
const confirmBookingMethod = require('../../methods/confirmBookingMethod.js');
const cancelBookingMethod = require('../../methods/cancelBookingMethod');

router.post('/:id',getUserData, getOrderID, async(req,res,next) => {
    const userResp = req.body.user_session_variables;
    console.log('confirmbooking',userResp)
    try{
        let strikeObj;
        if(userResp.confirmBooking[0] === 'Confirm Booking'){
            // do something
            strikeObj = await confirmBookingMethod(req);
        } else if(userResp.confirmBooking[0] === 'Cancel'){
            strikeObj = await cancelBookingMethod(req);
        }

    res.status(200).json(strikeObj.Data());
    } catch(err){
        console.log(err)
    }
});

module.exports = router;