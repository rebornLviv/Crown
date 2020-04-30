import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey = 'pk_test_tx4g9LGsOhNbZtCwIkX03xVY007SfhEVJX';

  const onToken = token => {
    console.log(token);
    axios({
     url:'payment',
     method:'post',
     data:{
       amount:priceForStripe,
       token
     } 
    }).then(
      res =>alert('Payment Succesful!')
    ).catch(error => {
      alert('Payment Failed! please checkout the credentials!')
      console.log(error)})
    
  };

  return (
    <StripeCheckout
      label='Pay Now'
      name='CRWN Clothing Ltd.'
      billingAddress
      shippingAddress
      image='https://svgshare.com/i/CUz.svg'
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel='Pay Now'
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
