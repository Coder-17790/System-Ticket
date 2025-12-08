// import { getRole } from "@/features/users/api/role";
// import { listNation } from "@/types/nation";

// // Hàm lấy dữ liệu và gán
// export async function loadRoleData() {
//   try {
//     // Chờ kết quả từ API
//     const roles = await getRole(); 
    
//     // Gán dữ liệu nhận được (giả sử roles là một mảng Nation[])
//     listNation = roles;
//     console.log('Dữ liệu roles đã được tải:', listNation);
    
//     // TRẢ VỀ: Nếu bạn muốn sử dụng nó ngay lập tức, bạn có thể trả về:
//     return roles;
//   } catch (error) {
//     console.error('Lỗi khi tải dữ liệu role:', error);
//     // Xử lý lỗi
//     return []; // Trả về mảng rỗng nếu có lỗi
//   }
// }