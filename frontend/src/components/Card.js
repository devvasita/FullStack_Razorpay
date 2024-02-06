import React from "react";

const Card = ({ amount, img, checkoutHandler }) => {
  return (
    <div
      className="card"
      style={{ width: "18rem", margin: "20px", padding: 10 }}
    >
      <img
        className="card-img-top"
        src={img}
        alt="Card image cap"
        style={{ height: 300, objectFit: "cover" }}
      />
      <div className="card-body">
        <p className="card-text">₹ {amount}</p>

        <a onClick={() => checkoutHandler(amount)} className="btn btn-primary">
          Checkout
        </a>
      </div>
    </div>
  );
};

export default Card;
