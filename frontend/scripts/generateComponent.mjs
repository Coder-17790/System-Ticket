import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question('🪄 Nhập tên component: ', (name) => {
  if (!name) {
    console.error('⚠️ Bạn chưa nhập tên component!');
    rl.close();
    process.exit(1);
  }

  // 🔹 Tạo file ngay tại thư mục đang chạy lệnh
  const componentsDir = process.env.INIT_CWD;

  const tsxPath = path.join(componentsDir, `${name}.tsx`);
  const scssPath = path.join(componentsDir, `${name}.module.scss`);

  // 🔹 Tạo file rỗng
  fs.writeFileSync(tsxPath, '');
  fs.writeFileSync(scssPath, '');

  console.log(`✅ Đã tạo file trống:
  📄 ${tsxPath}
  🎨 ${scssPath}`);

  rl.close();
});
