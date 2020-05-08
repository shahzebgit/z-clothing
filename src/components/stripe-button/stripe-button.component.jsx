import React from 'react';
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({ price }) =>{
    const priceForStripe = price * 100;
    const publishKey = 'pk_test_FuvwovvBUX34zPJHyVGYYE7Y00GjG7qsLh';

   const onToken =  token =>{
        console.log(token);
        alert('Payment Successful')
    }
    return (
        <StripeCheckout 
        label='Pay Now'
        name='z-clothing'
        billingAddress
        shippingAddress
        image='https://sendeyo.com/up/d/f3eb2117da'
        description={`Your total is ₹${price}`}
        amount={priceForStripe}
        panelLabel='Pay Now'
        token={onToken}
        stripeKey={publishKey}
        currency="INR"
        />
    );

} 

export default StripeCheckoutButton;

