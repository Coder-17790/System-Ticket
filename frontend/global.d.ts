//File global.d.ts (hoặc declaration.d.ts) dùng để khai báo kiểu dữ liệu (type declarations) cho TypeScript.
//Nói cách khác, nó giúp TypeScript hiểu những thứ mà mặc định nó không biết (như file .scss, .png, .svg, v.v.).

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
declare module '*.png' {
  const value: string;
  export default value;
}
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.svg';
