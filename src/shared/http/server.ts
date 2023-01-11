import 'reflect-metadata';
import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';

import routes from './routes';
import '@shared/typeorm';
import hasError from './middlewares/hasError';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);
app.use(errors());

app.use(hasError);

app.listen(3333, () => {
  console.log('Server started on port 3333! 🚀');
});
