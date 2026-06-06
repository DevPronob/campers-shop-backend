import Stripe from 'stripe';
import config from '../../config';
import { TPayment } from './paymentWithUserData.interface';
import { Payment } from './paymentWithUserData.model';
import AppError from '../../errors/AppError';
import { Cart } from '../cart/cart.model';
import mongoose from 'mongoose';

const stripe = new Stripe(config.stripe as string);

interface PaymentPayload {
    price: number;
}

interface PaymentResponse {
    clientSecret: string | null;
}

const setPayment = async (payload: PaymentPayload): Promise<PaymentResponse> => {
    const { price } = payload;
    const amount = Math.round(price * 100);

   try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
      metadata: { integration_check: 'accept_a_payment' },
    });

    return {
      clientSecret: paymentIntent.client_secret as string,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw new AppError(500, 'Failed to create payment intent');
  }
}


const setUserPayment = async (payload: TPayment) => {
 

  try {
    const result = await Payment.create(payload);


    console.log(`Payment created & cart deleted for user: ${payload.userId}`);

    return result; 
  } catch (error) {

    throw error;
  }
};

const getPaymentById = async (id: string) => {
  console.log(id)
    const payment = await Payment.find({userId:id});
    console.log(payment,"payment")
    if (!payment) {
        throw new AppError(404, "Payment not found");
    }
    return payment;
};
const getpayments =async() =>{
  const payments = await Payment.find();
  return payments;
}
const updateOrderStatus = async (paymentId: string, status: string) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new AppError(404, "Payment not found");
  }
  payment.status = status;
  await payment.save();
  return payment;
};

const cancleOrder = async (paymentId: string) => {
  const payment = await Payment.findById(paymentId);
  if (!payment) {
    throw new AppError(404, "Payment not found");
  }
  payment.status = "canceled";
  await payment.save();
  return payment;
};

export const paymentService = {
    setPayment,
    setUserPayment,
    getPaymentById,
    getpayments,
    updateOrderStatus,
    cancleOrder,
}
