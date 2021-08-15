import mongoose from 'mongoose';
import { config } from 'dotenv';
import Project from '../models/project.model';

config();

const { MD_HOST, MD_PORT, MD_USER, MD_PASSWORD } = process.env;
const URL = `mongodb://${MD_USER}:${MD_PASSWORD}@${MD_HOST}:${MD_PORT}/${MD_USER}?synchronize=true`;

const connect = async () => {
    await mongoose
        .connect(URL, {
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
