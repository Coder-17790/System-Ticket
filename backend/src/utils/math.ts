import crypto from 'crypto';

// Cộng ngày
const addDays = (date: Date, add: number): Date => {
  const result = new Date(date); // copy ngày gốc
  result.setDate(result.getDate() + add);
  return result;
};

const generateRefreshToken = (): string => {
  return crypto.randomBytes(64).toString('hex');
};
export default { addDays, generateRefreshToken };
