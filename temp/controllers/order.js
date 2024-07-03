const app = require("../js/app.js");
const path = require('path');
const Razorpay = require('razorpay');
const crypto = require("crypto");


exports.createOrder = async (req, res) => {
	var instance = new Razorpay({
	  key_id: 'rzp_test_38cOls6jn9siXg',
	  key_secret: 'DqERvWFPo4jVE83sYttHyVJ9',
	});

	console.log(req.body.values);
	instance.orders.create(req.body.values).then((data) => {
		console.log(data)
	    res.status(200).send({"sub":data,"status":"success"});
	}).catch((error) => {
		console.log(error)
	    res.status(400).send({"sub":error,"status":"failed"});
	})
};

exports.verifyOrder = async (req, res) => {
	body=req.body.values.razorpay_order_id + "|" + req.body.values.razorpay_payment_id;
	var expectedSignature = crypto.createHmac('sha256', 'DqERvWFPo4jVE83sYttHyVJ9').update(body.toString()).digest('hex');
	console.log("verifyOrder:", req.body.values);
	console.log("sig"+req.body.values.razorpay_signature);
	console.log("sig"+expectedSignature);
	var response = {"status":"failure"};
	if(expectedSignature === req.body.values.razorpay_signature){
		response={"status":"success"};
	}
	res.json(response);
};