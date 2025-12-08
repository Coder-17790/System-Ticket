import { InferAttributes, InferCreationAttributes } from 'sequelize';
import Nation from './nation.model';

export type RoleAttributes = InferAttributes<Nation>;
export type RoleCreation = InferCreationAttributes<Nation>;
export type RoleUpdate = Partial<Nation>;
