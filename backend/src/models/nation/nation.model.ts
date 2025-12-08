import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import { sequelize } from '../../database/sequelize';

export class Nation extends Model<InferAttributes<Nation>, InferCreationAttributes<Nation>> {
  declare id: CreationOptional<number>;
  declare name: string;
}

Nation.init(
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
    modelName: 'Nation', // Đảm bảo tên mô hình là 'Role' thay vì 'User'
    tableName: 'nations',
    timestamps: false,
    underscored: true,
    paranoid: false, // Chỉ dùng khi có cột delete_at (tự động bắt)
  }
);

export default Nation;
