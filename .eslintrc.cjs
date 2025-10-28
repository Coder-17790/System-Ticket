/* eslint-env node */
module.exports = {
  root: true,
  env: { node: true, es2022: true },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    // Bật kiểm tra theo type (nặng hơn):
    // project: ["./tsconfig.json"],
    // tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "import", "promise", "security"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:import/recommended",
    "plugin:promise/recommended",
    "plugin:security/recommended",
    "plugin:import/typescript",
    "prettier" // để cuối cùng
  ],
  settings: {
    "import/resolver": {
      typescript: {
        // đọc path từ tsconfig nếu bạn dùng "paths"
        project: "./tsconfig.json",
      },
    },
  },
  rules: {
    // TypeScript
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "@typescript-eslint/consistent-type-imports": ["warn", { prefer: "type-imports" }],

    // Import sạch sẽ, ổn định
    "import/order": ["warn", {
      groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
      "newlines-between": "always",
      alphabetize: { order: "asc", caseInsensitive: true }
    }],
    "import/no-default-export": "off", // bật "warn" nếu muốn cấm default export

    // Promise
    "promise/always-return": "off", // tuỳ bạn
    "promise/catch-or-return": "warn",

    // Node/General
    "no-console": "off", // bật "warn" trên prod nếu muốn
    "security/detect-object-injection": "off" // hay false positive, cân nhắc bật
  },
  ignorePatterns: [
    "dist/",
    "node_modules/",
    "coverage/",
    // Nếu enable project: true thì thêm:
    // ".eslintrc.cjs"
  ],
};
