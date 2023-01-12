import { celebrate, Segments } from 'celebrate';
import { Router } from 'express';
import multer from 'multer';
import Joi from 'joi';
import uploadConfig from '@config/upload';
import UsersController from '../controllers/UsersController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import UpdateUserAvatarController from '../controllers/UpdateUserAvatarController';

const usersRouter = Router();
const usersController = new UsersController();
const usersAvatarController = new UpdateUserAvatarController();

const upload = multer(uploadConfig);

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

usersRouter.patch(
  '/avatar',
  isAuthenticated,
  upload.single('avatar'),
  usersAvatarController.update,
);

export default usersRouter;
