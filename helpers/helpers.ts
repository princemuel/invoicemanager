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

type FormatDateFunction = (
  date?: string,
  formatOptions?: Intl.DateTimeFormatOptions[],
  separator?: string
) => string;

export const formatDate: FormatDateFunction = (
  date,
  formatOptions = [{ day: 'numeric' }, { month: 'short' }, { year: 'numeric' }],
  separator = ' '
) => {
  if (typeof date !== 'string')
    throw new Error("The date must be of type 'string'");

  return formatOptions
    .map((options) => {
      const dateFormatter = new Intl.DateTimeFormat('en', options);
      return dateFormatter.format(new Date(date));
    })
    .join(separator);
};

export function getMonth(string: string) {
  return string?.split(/(?<=^\S+)\s/)[1];
}
const convertFee = (fee: number) => {
  return parseInt(fee.toFixed(0));
};
