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
      // You can also attach metadata if needed
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
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const result = await Payment.create([payload], { session });

    await Cart.deleteMany({ userId: payload.userId }).session(session);

    await session.commitTransaction();
    session.endSession();

    console.log(`Payment created & cart deleted for user: ${payload.userId}`);

    return result[0]; 
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getPaymentById = async (id: string) => {
  console.log(id)
    const payment = await Payment.find({userId:id});
    console.log(payment)
    if (!payment) {
        throw new AppError(404, "Payment not found");
    }
    return payment;
};

export const paymentService = {
    setPayment,
    setUserPayment,
    getPaymentById
}
