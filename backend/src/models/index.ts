// src/models/index.ts

import User from './user/user.model';
import Role from './role/role.model';
import { sequelize } from '../database/sequelize'; // Đảm bảo import sequelize
import Nation from './nation/nation.model';
import RefreshToken from './refreshToken/refreshToken.model';

// Liên kết User vs Role
User.belongsTo(Role, { as: 'role' });
Role.hasMany(User, { foreignKey: 'role_id', as: 'users' });

// Liên kết User vs Role
User.belongsTo(Nation, { as: 'nation' });
Nation.hasMany(User, { foreignKey: 'nation_id', as: 'users' });

export { User, Role, Nation, RefreshToken, sequelize };
