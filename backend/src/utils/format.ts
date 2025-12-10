const genIdTime = (data: Date | string) => {
  const date = new Date(data);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const secounds = date.getSeconds();

  return `${year}${month}${day}${hours}${minutes}${secounds}`;
};

export default { genIdTime };
