import express from 'express';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import createProjectRouter from './routes/create-project';
import yourProjectsRouter from './routes/projects';
import projectRouter from './routes/project/project';
import teammateRouter from './routes/project/teammate';
import taskRouter from './routes/project/task';
import cors from 'cors';
import mongoose from 'mongoose';
import connect from './middleware/database';

const app = express();

connect();

app.use(cors());

app.use(express.json());

app.use(loginRouter);

app.use(registerRouter);

app.use(createProjectRouter);

app.use(yourProjectsRouter);

app.use(projectRouter);

app.use(teammateRouter);

app.use(taskRouter);

const PORT = 8080;

process.on('SIGINT', () => {
    mongoose.connection.close(() => {
        console.log('Connection closed!');
        process.exit(0);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
