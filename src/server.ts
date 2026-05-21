import app from './app';
import config from './config';

// Only start the listener if we are running in a local environment (not Vercel)
if (!process.env.VERCEL) {
    app.listen(config.port, () => {
        console.log(`Server running on port ${config.port}`);
    });
}

export default app;