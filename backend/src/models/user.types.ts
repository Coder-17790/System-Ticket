import { InferAttributes, InferCreationAttributes } from 'sequelize';
import { User } from './user.model';

export type UserAttributes = InferAttributes<User>;
export type UserCreation = InferCreationAttributes<User>;
export type UserUpdate = Partial<UserCreation>;
