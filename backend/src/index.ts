import express from 'express';
import cors from 'cors';
import authRouter from './routes/auth';
require('dotenv').config();


const app = express();

// const corsOptions = {
//   origin: 'http://localhost:8081'
// };

// app.use(cors(corsOptions));

app.use(express.json());

app.use(authRouter);

const PORT = 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
