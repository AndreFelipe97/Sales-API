import AppError from '@shared/errors/AppError';
import path from 'path';
import fs from 'fs';
import { getCustomRepository } from 'typeorm';
import UsersRepository from '../typeorm/repositories/UsersRepository';
import uploadConfig from '@config/upload';
import User from '../typeorm/entities/User';

interface IRequestUpdateUserAvatarService {
  userId: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({
    userId,
    avatarFilename,
  }: IRequestUpdateUserAvatarService): Promise<User> {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findById(userId);

    if (!user) throw new AppError('User not found.');

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);

      const userAvaterFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvaterFileExists) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFilename;

    await usersRepository.save(user);

    return user;
  }
}
