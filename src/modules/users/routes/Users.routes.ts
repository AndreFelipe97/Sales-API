import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import Joi from 'joi';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.get('/', isAuthenticated, usersController.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

export default usersRouter;
