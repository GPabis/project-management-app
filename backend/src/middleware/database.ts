import mongoose from 'mongoose';
import { config } from 'dotenv';

config();

const { MD_HOST, MD_PORT, MD_USER, MD_PASSWORD } = process.env;

const connect = async () => {
    const url = `mongodb://${MD_USER}:${MD_PASSWORD}@${MD_HOST}:${MD_PORT}/${MD_USER}?synchronize=true`;

    await mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .catch((error) => {
            console.log('Database connection failed. Exiting now...');
            console.log(error);
            process.exit(1);
        });

    console.log('Successfully connected to database');
};

export default connect;
