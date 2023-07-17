import React, { useState, useContext } from 'react';
import { FormGroup, Label, Input } from "reactstrap";
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useRouter } from 'next/router';
import AppContext from '../components/AppContext';
import CardSection from "../components/cardSection";
import { createPayment } from "../lib/auth";

function CheckoutForm() {
  const [data, setData] = useState({
    address: '',
    city: '',
    state: '',
  });

  const stripe = useStripe();
  const router = useRouter();
  const elements = useElements();
  const appContext = useContext(AppContext);

  function onChange(e) {
    const { name, value } = e.target;
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function submitOrder() {
    const cardElement = elements.getElement(CardElement);
    const result = await stripe.createToken(cardElement);

    if (result.error) {
      console.error('An error occurred while creating a stripe token:', result.error);
      return;
    }

    const token = result.token.id;
    const amount = Number(Math.round(appContext.cart.total + 'e2') + 'e-2');
    const dishes = appContext.cart.items;
    const { address, city, state } = data;

    const response = await createPayment(token, amount, dishes, { address, city, state });

    if (response && response.status === 200) {
      alert('Transaction Successful, continue your shopping');
      router.push('/');
    } else {
      alert(response ? response.statusText : 'An error occurred while creating a payment');
    }
  }

  return (
    <div className="paper">
      <h5>Your information:</h5>
      <hr />
      <FormGroup style={{ display: 'flex' }}>
        <div style={{ flex: '0.90', marginRight: 10 }}>
          <Label>Address</Label>
          <Input name="address" onChange={onChange} />
        </div>
      </FormGroup>
      <FormGroup style={{ display: 'flex' }}>
        <div style={{ flex: '0.65', marginRight: '6%' }}>
          <Label>City</Label>
          <Input name="city" onChange={onChange} />
        </div>
        <div style={{ flex: '0.25', marginRight: 0 }}>
          <Label>State</Label>
          <Input name="state" onChange={onChange} />
        </div>
      </FormGroup>
      <CardSection data={data} submitOrder={submitOrder} />
      <style jsx global>{`
        /* Styles for the component */
      `}</style>
    </div>
  );
}

export default CheckoutForm;
