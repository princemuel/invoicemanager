// NOTE: To be refactored
export const shippingFee = (amount: number) => {
  const fee = amount * 0.01;
  return convertFee(fee);
};

export const vatFee = (amount: number) => {
  const fee = amount * 0.001;
  return convertFee(fee);
};

export const grandTotal = (total: number, shipping: number, vat: number) => {
  const fee = total + shipping + vat;
  return convertFee(fee);
};

export const formatPrice = (price?: number) => {
  if (typeof price !== 'number')
    throw new Error("THe item's price must be a number");

  return Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

export function joinDate(
  date: number | Date | undefined,
  formatOptions: Intl.DateTimeFormatOptions[],
  separator: string
) {
  function callback(options: Intl.DateTimeFormatOptions | undefined) {
    let dateFormatter = new Intl.DateTimeFormat('en', options);
    return dateFormatter.format(date);
  }
  return formatOptions?.map(callback).join(separator);
}

export const formatDate = (date?: string) => {
  if (typeof date !== 'string')
    throw new Error("The date must be of type 'string'");

  let formatOptions: Intl.DateTimeFormatOptions[] = [
    { day: 'numeric' },
    { month: 'short' },
    { year: 'numeric' },
  ];

  return joinDate(new Date(date), formatOptions, ' ');
};

export function getMonth(string: string) {
  return string?.split(/(?<=^\S+)\s/)[1];
}
const convertFee = (fee: number) => {
  return parseInt(fee.toFixed(0));
};
