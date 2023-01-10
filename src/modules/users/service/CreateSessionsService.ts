import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequestCreateSessionsService {
  email: string;
  password: string;
}

interface IResponseCreateSessionsService {
  user: User;
  token: string;
}

export default class CreateSessionsService {
  public async execute({
    email,
    password,
  }: IRequestCreateSessionsService): Promise<IResponseCreateSessionsService> {
    const userRepository = getCustomRepository(UsersRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination', 401);

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed)
      throw new AppError('Incorrect email/password combination', 401);

    const token = sign({}, '50aba9e89bd99525644a423698ae080f', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
