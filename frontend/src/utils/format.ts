import { OptionCBB } from '@/components/ui/STComboBox';

const fomatData_1 = (data: Date | string, format: 'dd/mm/yyyy' | 'yyyy-mm-dd' = 'dd/mm/yyyy') => {
  const date = new Date(data);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return format === 'dd/mm/yyyy' ? `${day}/${month}/${year}` : `${year}-${month}-${day}`;
};

const mapToOptionsCbb = <T, V extends keyof T, L extends keyof T>(
  data: T[] | null | undefined,
  valueKey: V,
  labelKey: L
): OptionCBB[] => {
  if (!data) return []; // data null/undefined thì trả mảng rỗng

  return data.map((item) => ({
    value: item[valueKey] as OptionCBB['value'],
    label: item[labelKey] as OptionCBB['label'],
  }));
};

export default { fomatData_1, mapToOptionsCbb };
