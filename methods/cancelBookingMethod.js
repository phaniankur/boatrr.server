const baseAPI = require("../config/baseAPI");
const Create = require("../interfaces/strike");
const booking = require("../models/booking");

async function confirmBookingMethod(req){

    const strikeBody = req.body.bybrisk_session_variables;
    const userResp = req.body.user_session_variables;
    const dbRes = req.body.user_session_variables.rideDetails;
    // userResp.basePrice[0] = userResp.basePrice[0].replace('₹', '');

    await booking.findByIdAndUpdate(req.params.id,{
        riderPhone: strikeBody.phone,
        riderEmail: '',
        rideDetails:{
            rideTime: dbRes.rideTime,
            rideDate: dbRes.rideDate,
            rideRoute: dbRes.rideRoute,
            discountCode: dbRes.discountCode,
            bookingStatus: 'cancelled',
            orderID: dbRes.orderID,
            noofRiders: '',
            pickupGhat: 'Kedar Ghat',
            typeofBoat: '',
            bookingPrice: dbRes.bookingPrice,
            txnId: '',
            paymentStatus: ''
        },
    }).catch(err=> console.log(err))
    
    const strikeObj = new Create('getting_started', '');
    
    quesObj = strikeObj.Question('val1');
    quesObj.
        QuestionText().
            SetTextToQuestion(`Hi ${strikeBody.username}, Your booking has been cancelled!`)

    //answer
    cancelAnswerObj = quesObj.Answer(false);
    cancelAnswerObj.AnswerCardArray(strikeObj.HORIZONTAL_ORIENTATION);

        cancelAnswerObj = cancelAnswerObj.AnswerCard().
            SetHeaderToAnswer(1, strikeObj.HALF_WIDTH).
            AddTextRowToAnswer(strikeObj.H5, 'Go Back', "#009646", true);
    return strikeObj
}
module.exports = confirmBookingMethod