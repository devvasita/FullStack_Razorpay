import React from "react";
import { useSearchParams } from "react-router-dom";

const PaymentSuccess = () => {
  const searchQuery = useSearchParams()[0];

  const refNum = searchQuery.get("reference");

  console.log(searchQuery);

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",    
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h1>Payment Done Successfully</h1>
      <h3>Refrence Number : {refNum}</h3>
    </div>
  );
};

export default PaymentSuccess;
