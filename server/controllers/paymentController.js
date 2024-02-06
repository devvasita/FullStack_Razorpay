import { Payment as PaymentDB } from "../model/paymentModel.js";
import { instance } from "../server.js";
import crypto from "crypto";

export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100),
    currency: "INR",
  };

  try {
    // const order = await instance.orders.create(options);
    const order = await instance.orders.create(options);

    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const paymentverification = async (req, res) => {
  console.log(req.body);

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const body = razorpay_order_id + "|" + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
    .update(body.toString())
    .digest("hex");

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    const payment = new PaymentDB({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    await payment.save();

    res.redirect(
      `http://localhost:3000/paymentsuccess?reference=${razorpay_payment_id}`
    );
  } else {
    res.status(400).json({ success: false });
  }
};

// {
//   razorpay_payment_id: 'pay_NVZm8odNfuYU9y',
//   razorpay_order_id: 'order_NVZjQgy2djm4Wx',
//   razorpay_signature: '71bfeededdd52a6a2750e7af04e5d559892d6468a6effc1002a907570b9e1139'
// }
