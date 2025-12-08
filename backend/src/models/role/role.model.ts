import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../../database/sequelize';

export class Role extends Model<InferAttributes<Role>, InferCreationAttributes<Role>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Role.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Role', // Đảm bảo tên mô hình là 'Role' thay vì 'User'
    tableName: 'roles',
    timestamps: false,
    underscored: true,
    paranoid: false, // Chỉ dùng khi có cột delete_at (tự động bắt)
  }
);

export default Role;
