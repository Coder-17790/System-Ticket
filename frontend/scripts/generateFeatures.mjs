import fs from 'fs';
import path from 'path';

// 📌 Thư mục hiện tại khi bạn chạy lệnh
const baseDir = process.env.INIT_CWD || process.cwd();

// 📁 Danh sách các folder muốn tạo
const folders = ['api', 'components', 'hooks', 'pages'];

folders.forEach((folder) => {
  const folderPath = path.join(baseDir, folder);

  // Nếu chưa có thì tạo
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
    console.log(`📁 Đã tạo thư mục: ${folder}`);
  } else {
    console.log(`✔️ Đã tồn tại: ${folder}`);
  }
});

console.log('🎉 Hoàn tất!');
