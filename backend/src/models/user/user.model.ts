import {
  Model,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  DataTypes,
} from 'sequelize';
import { sequelize } from '../../database/sequelize';
import Role from '../role/role.model';
import Nation from '../nation/nation.model';
import { AvatarPath } from '@/type/path';
import bcrypt from 'bcrypt';

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<string>;
  declare email: CreationOptional<string | null>;
  declare username: string;
  declare password: string;
  declare fullName: CreationOptional<string | null>;
  declare isActive: CreationOptional<boolean>;
  declare phone: CreationOptional<string | null>;
  declare dateOfBirth: CreationOptional<string | null>; // DATEONLY trong Sequelize trả về string 'YYYY-MM-DD'
  declare lastLogin: CreationOptional<Date | null>;
  declare gender: CreationOptional<'male' | 'female' | null>;
  declare roleId: CreationOptional<string | null>; // BIGINT trả về string trong JS để tránh mất độ chính xác
  declare nationId: CreationOptional<string | null>;
  declare bio: CreationOptional<string | null>;
  declare isVerified: CreationOptional<boolean>;
  declare twoFaEnabled: CreationOptional<boolean>;
  declare title: CreationOptional<string | null>;
  declare avatar: CreationOptional<string | null>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  // Quan hệ (Associations)
  declare role?: Role;
  declare nation?: Nation;

  // Phương thức ẩn password khi trả về JSON (Bảo mật)
  toJSON() {
    const { password, ...values } = this.get();
    return values;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    email: {
      type: DataTypes.STRING(255),
      unique: true,
      validate: { isEmail: true },
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    fullName: {
      type: DataTypes.STRING(255),
      field: 'full_name',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      field: 'is_active',
    },
    twoFaEnabled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'twofa_enabled',
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      field: 'date_of_birth',
    },
    lastLogin: {
      type: DataTypes.DATE,
      allowNull: true,
      field: 'last_login',
    },
    gender: {
      type: DataTypes.ENUM('male', 'female'), // Dùng ENUM sẽ tốt hơn cho DB
      allowNull: true,
      field: 'gender',
    },
    roleId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'role_id',
    },
    nationId: {
      type: DataTypes.BIGINT,
      allowNull: true,
      field: 'nation_id',
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isVerified: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      field: 'is_verified',
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    avatar: {
      type: DataTypes.TEXT,
      allowNull: true,
      field: 'avatar',
      get() {
        const raw = this.getDataValue('avatar');
        if (!raw) return null;
        // Kiểm tra nếu là link URL tuyệt đối thì trả về luôn, nếu là file name thì mới nối path
        return raw.startsWith('http') ? raw : `/${AvatarPath}_${this.id}/${raw}`;
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    underscored: true,
    // Scopes giúp bạn lấy password khi cần (ví dụ lúc Login)
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: { attributes: { include: ['password'] } },
    },
    hooks: {
      beforeCreate: async (user: User) => {
        if (user.password) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
      beforeUpdate: async (user: User) => {
        // Chỉ hash lại nếu password bị thay đổi
        if (user.changed('password')) {
          user.password = await bcrypt.hash(user.password, 10);
        }
      },
    },
  }
);

export default User;
