export const fomatData_1 = (
  data: Date | string,
  format: 'dd/mm/yyyy' | 'yyyy-mm-dd' = 'dd/mm/yyyy'
) => {
  const date = new Date(data);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return format === 'dd/mm/yyyy' ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;
};

// export { fomatData_1 };
