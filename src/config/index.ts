import dotenv from 'dotenv';

// Load .env only in development
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}

const requiredEnvVars = [
  'MONGODB_URL',
  'JWT_SECRET',
  'NODE_ENV',
  'EMAIL',
  'PASSWORD',
];

requiredEnvVars.forEach((key) => {
  if (!process.env[key]) {
    throw new Error(`❌ Missing environment variable: ${key}`);
  }
});

const config = {
  port: process.env.PORT || '5000',
  mongodb_url: process.env.MONGODB_URL as string,
  stripe: process.env.STRIPE || '', // optional
  jwt_secret: process.env.JWT_SECRET as string,
  node_env: process.env.NODE_ENV as 'development' | 'production',
  email: process.env.EMAIL as string,
  password: process.env.PASSWORD as string,
};

export default config;