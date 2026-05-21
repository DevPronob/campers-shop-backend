import app from './app';
import mongoose from 'mongoose';
import config from './config';
import { seedSuperAdmin } from './utilitis/seedSuperAdmin';




// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(config.mongodb_url || "mongodb+srv://pronobroy3601:m3edI5rGJcZnDTcF@cluster0.kabo16c.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0");
        console.log("Database connected successfully");
        await seedSuperAdmin(); 
    } catch (error) {
        console.error("Database connection error:", error);
    }
};

// Start database connection
connectDB();

// Only start the listener if we are running in a local environment (not Vercel)
if (!process.env.VERCEL) {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

export default app;