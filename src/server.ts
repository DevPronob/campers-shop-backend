import app from './app';
import mongoose from 'mongoose';
import config from './config';
import { seedSuperAdmin } from './utilitis/seedSuperAdmin';
async function main() {
    try {
        await mongoose.connect(config.mongodb_url as string);

        app.listen(config.port, () => {
            console.log(`Example app listening on port ${process.env.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
main();
seedSuperAdmin()