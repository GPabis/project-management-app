import express from 'express';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(loginRouter);

app.use(registerRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
