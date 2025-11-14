import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string | number>;
  declare orgId: CreationOptional<string | number | null>;
  declare email: string;
  declare title: string;
  declare fullName: string;
  declare isActive: CreationOptional<boolean>;
  declare phone: CreationOptional<string | null>;
  declare language: CreationOptional<string | null>;
  declare position: CreationOptional<string | null>;
  declare dateOfBirth: CreationOptional<Date | null>;
  declare lastLogin: CreationOptional<Date | null>;
  declare address: CreationOptional<string | null>;
  declare gender: CreationOptional<string | null>;
  declare role: CreationOptional<string>;
  declare avatarUrl: CreationOptional<string | null>;
  declare bio: CreationOptional<string | null>;
  declare isVerified: CreationOptional<boolean>;
  declare deletedAt: CreationOptional<Date | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}
