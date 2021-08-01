import express from 'express';
import loginRouter from './routes/login';
import registerRouter from './routes/register';
import createProjectRouter from './routes/create-project';
import yourProjectsRouter from './routes/projects';
import projectRouter from './routes/project/project';
import teammateRouter from './routes/project/teammate';
import cors from 'cors';

const app = express();

app.use(cors());

app.use(express.json());

app.use(loginRouter);

app.use(registerRouter);

app.use(createProjectRouter);

app.use(yourProjectsRouter);

app.use(projectRouter);

app.use(teammateRouter);

const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});
