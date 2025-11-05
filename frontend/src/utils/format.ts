// Định dạng ngày tháng về dạng DD/MM/YYYY
export const fomatData_1 = (data: string | number) => {
  const date = new Date(data);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};





// export { fomatData_1 };
