import type { InferAttributes, InferCreationAttributes } from 'sequelize';
import type RefreshToken from './refreshToken.model';

export type RefreshTokenAttributes = InferAttributes<RefreshToken>;
export type RefreshTokenCreation = InferCreationAttributes<RefreshToken>;
export type RefreshTokenUpdate = Partial<RefreshTokenCreation>;
