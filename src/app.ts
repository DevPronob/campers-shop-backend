import express, { Request, Response } from 'express';
import router from './router';
import cors from 'cors';
import notFound from './middleware/notFound';
import cookieParser from 'cookie-parser';
import { globalErrorHandler } from './middleware/globalErrorHandler';
import config from './config';
import mongoose from 'mongoose';
import { seedSuperAdmin } from './utilitis/seedSuperAdmin';

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

// Database connection caching for Serverless
let dbConnectionPromise: Promise<any> | null = null;

const connectDB = () => {
  if (!dbConnectionPromise) {
    dbConnectionPromise = mongoose.connect(config.mongodb_url || "mongodb+srv://pronobroy3601:m3edI5rGJcZnDTcF@cluster0.kabo16c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
      .then(async () => {
        console.log("Database connected successfully");
        try {
          await seedSuperAdmin();
        } catch (err) {
          console.error("Super admin seeding failed:", err);
        }
      })
      .catch((error) => {
        console.error("Database connection error:", error);
        dbConnectionPromise = null; // Reset connection promise to allow retrying on the next request
        throw error;
      });
  }
  return dbConnectionPromise;
};

// Start database connection in the background as soon as module loads
connectDB();

// Middleware to ensure DB connection before handling any requests
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
});

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