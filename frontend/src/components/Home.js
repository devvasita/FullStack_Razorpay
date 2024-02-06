import React from "react";
import Card from "./Card";
import axios from "axios";

const Home = () => {
  const checkoutHandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:5010/api/getKey");

      console.log("key", key);

      const {
        data: { order },
      } = await axios.post("http://localhost:5010/api/checkout", {
        amount,
      });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Amitabh Bachhan",
        description: "Tutorial of RazorPay",
        image:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMGouYsYfTmNXidfJ8Y8Fawd8RjBV-LDHSyA&usqp=CAU",
        order_id: order.id,
        callback_url: "http://localhost:5010/api/paymentverification",
        prefill: {
          name: "Amitabh Bachhan",
          email: "bachhan@gmail.com",
          contact: "99525252",
        },
        notes: {
          address: "Razorpay Corporate Office Mumbai",
        },
        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.log("erorr", error);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center", // Corrected the property name
      }}
    >
      <Card
        img={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSkn7vbOpDPFENzjaeQXUYdVPcrRJMC6tZlNQ&usqp=CAU"
        }
        amount={50000}
        checkoutHandler={checkoutHandler}
      ></Card>
      <Card
        img={
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPxOeowKYHexZHbhB2EgNOSJDOIo5Q8RLvag&usqp=CAU"
        }
        amount={20000}
        checkoutHandler={checkoutHandler}
      ></Card>
    </div>
  );
};

export default Home;
