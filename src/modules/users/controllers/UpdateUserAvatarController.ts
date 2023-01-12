import { Request, Response } from 'express';
import UpdateUserAvatarService from '../service/UpdateUserAvatarService';

export default class UpdateUserAvatarController {
  public async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.user;

    const updateAvatar = new UpdateUserAvatarService();

    const user = await updateAvatar.execute({
      userId: id,
      avatarFilename: req.file?.filename as string,
    });

    return res.json(user);
  }
}
