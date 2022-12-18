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

export const formatPrice = (price: number) => {
  return Intl.NumberFormat('en-GB', {
    maximumFractionDigits: 2,
    style: 'currency',
    currency: 'GBP',
  }).format(price);
};

const convertFee = (fee: number) => {
  return parseInt(fee.toFixed(0));
};
