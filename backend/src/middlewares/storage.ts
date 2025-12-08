import multer from 'multer';
import path from 'path';
// const avatarStorage = multer.diskStorage({
//   destination: 'public/images/avatar',
//   filename: (req, file, cb) => {
//     // Lấy id bạn truyền trong URL
//     const id = req.params.id;
//     cb(null, id + path.extname(file.originalname));
//   },
// });
const avatarStorage = multer.memoryStorage();
export const uploadAvatar = multer({ storage: avatarStorage }).single('avatar');

// const productStorage = multer.diskStorage({
//   destination: 'public/products/',
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// export const uploadProduct = multer({ storage: productStorage });

