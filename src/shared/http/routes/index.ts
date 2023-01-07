import productsRouter from '@modules/products/routes/Products.routes';
import usersRouter from '@modules/users/routes/Users.routes';
import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (req: Request, res: Response) => {
  return res.json({ message: 'Hello Dev! 😃' });
});

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);

export default routes;
