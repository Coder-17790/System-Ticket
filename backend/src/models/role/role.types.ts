import { InferAttributes, InferCreationAttributes } from 'sequelize';
import Role from './role.model';

export type RoleAttributes = InferAttributes<Role>;
export type RoleCreation = InferCreationAttributes<Role>;
export type RoleUpdate = Partial<Role>;
