import express from 'express';
import router from './router';
import cors from 'cors';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import config from './config';
import mongoose from 'mongoose';
import { seedSuperAdmin } from './utilitis/seedSuperAdmin';

const app = express();

// CORS
const corsOptions = {
  origin: [
    'https://campers-ecom-frontend.vercel.app',
    'http://localhost:5173',
  ],
  credentials: true,
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// DB — connect once on startup, no per-request reconnect needed
// mongoose handles connection pooling internally
const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb_url as string);
    console.log('Database connected successfully');
    await seedSuperAdmin();
  } catch (error) {
    console.error('Database connection error:', error);
    process.exit(1); // crash fast on startup failure
  }
};

connectDB();

// Routes
app.use('/api', router);

app.get('/', (_req, res) => {
  res.send('Hello World!');
});

// Error handlers — must be last
app.use(notFound);
app.use(globalErrorHandler);

export default app;