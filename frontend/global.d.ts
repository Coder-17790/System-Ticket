//File global.d.ts (hoặc declaration.d.ts) dùng để khai báo kiểu dữ liệu (type declarations) cho TypeScript.
//Nói cách khác, nó giúp TypeScript hiểu những thứ mà mặc định nó không biết (như file .scss, .png, .svg, v.v.).

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}
