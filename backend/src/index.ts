import express from 'express';
import authRouter from './routes/auth';
import { config } from 'dotenv';

config();

const app = express();

app.use(express.json());

app.use(authRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
