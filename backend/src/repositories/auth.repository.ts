import { RefreshToken } from '@/models';
import { RefreshTokenCreation } from '@/models/refreshToken/refreshToken.type';

export class RefreshTokenRepository {
  async findByToken(token: string) {
    return await RefreshToken.findOne({
      where: { token },
    });
  }

  async delete(userId: string) {
    const refreshTokens = await RefreshToken.findAll({
      where: { userId },
    });

    if (!refreshTokens.length) return null;

    const destroyPromises = refreshTokens.map((rt) => rt.destroy());
    return Promise.all(destroyPromises);
  }

  async create(refreshToken: RefreshTokenCreation) {
    return RefreshToken.create(refreshToken);
  }
}
