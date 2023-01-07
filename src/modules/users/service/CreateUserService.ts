import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UsersRepository from '../typeorm/repositories/UsersRepository';

interface IRequesUser {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  public async execute({ name, email, password }: IRequesUser): Promise<User> {
    const userRepository = getCustomRepository(UsersRepository);

    const userExists = await userRepository.findByEmail(email);

    if (userExists)
      throw new AppError('There is already one user with this email');

    const user = userRepository.create({
      name,
      email,
      password,
    });

    await userRepository.save(user);

    return user;
  }
}
