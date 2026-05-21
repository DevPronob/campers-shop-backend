import express, { Request, Response } from 'express';
import router from './router';
import cors from 'cors';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import config from './config';

const app = express();

const corsOptions = {
  origin: [
    'https://campers-ecom-frontend.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
};

// ✅ CORS must come first, before any routes
app.use(cors(corsOptions));

// ✅ Handle OPTIONS preflight requests
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use('/api', router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Error handling
app.use(notFound);
app.use(globalErrorHandler);

export default app;