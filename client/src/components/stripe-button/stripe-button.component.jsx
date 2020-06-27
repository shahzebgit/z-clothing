import React from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";


const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishKey = "pk_test_FuvwovvBUX34zPJHyVGYYE7Y00GjG7qsLh";

  const onToken = (token) => {
    axios({
      url: "payment",
      method: "post",
      data: {
        amount: priceForStripe,
        token,
      },
    })
      .then(response => {
        alert("Payment was Successful");
      })
      .catch(error => {
        console.log("Payment error: ", JSON.parse(error));
        alert(
          "There was an issue with your payment. Please make sure to use proper provided credit/debit card"
        );
      });
  };
  return (
    <StripeCheckout
      label="Pay Now"
      name="z-clothing"
      billingAddress
      shippingAddress
      image="https://sendeyo.com/up/d/f3eb2117da"
      description={`Your total is ₹${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken}
      stripeKey={publishKey}
      SameSite='None'
      currency="INR"
    />
  );
};

export default StripeCheckoutButton;
