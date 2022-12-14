const express = require('express');
const router = express.Router();

const booking = require('../../models/booking.js');
const getUserData = require('../../middlewares/getUserData.js');

const finalPrice = require('../../methods/finalPrice');
const { validDiscounts } = require('../../config/data.js');

const invalidDiscount = require('../../methods/invalidDiscount');
const discount = require('../../models/discount')

router.post('/:id', getUserData,  async(req,res) => {

    try{
        const strikeBody = req.body.bybrisk_session_variables;
        const userResp = req.body.user_session_variables;
        const dbRes = req.body.user_session_variables.rideDetails;

        let strikeObj;
    
        if(userResp.discount){
            const discountValid = await discount.find({code: userResp.discount.toLowerCase()})
            if(discountValid.length>0){
                // userResp.basePrice[0] = userResp.basePrice[0].replace('₹', '')
                dbRes.bookingPrice = dbRes.bookingPrice - discountValid[0].amount
                await booking.findByIdAndUpdate(req.params.id,{
                    riderPhone: strikeBody.phone,
                    rideDetails:{
                        rideTime: dbRes.rideTime,
                        rideDate: dbRes.rideDate,
                        rideRoute: dbRes.rideRoute,
                        discountCode: userResp.discount || '',
                        bookingPrice: dbRes.bookingPrice || '',
                        // bookingStatus: 'pending'
                    },
                }).then(console.log('saved')).catch(err=> console.log(err))
                strikeObj = finalPrice(req);
            } else{
                console.log('invalid code')
                strikeObj = invalidDiscount(req);
            }
        }
        res.status(200).json(strikeObj.Data());
    }catch(err){
        console.log(err)
    }

});

module.exports = router;