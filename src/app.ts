import express, { Request, Response } from 'express';
import router from './router';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: ['https://campers-ecom-frontend.vercel.app'], 
  credentials: true,
}));
console.log("all okkkk")



app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Routes
app.use('/api', router);

// Error handling

app.use(notFound);
app.use(globalErrorHandler);

export default app;
