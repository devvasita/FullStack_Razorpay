import { app } from "./app.js";
import Razorpay from "razorpay";
import { connectDB } from "./config/db.js";

connectDB();

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

app.listen(5010, (errr) => {
  if (errr) throw errr;
  console.log(`Server is working on 5010`);
});
