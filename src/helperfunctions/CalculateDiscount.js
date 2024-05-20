export const calculateDiscount = (originalPrice, discountedPrice) => {
  const discountAmount = originalPrice - discountedPrice;
  const discountPercentage = (discountAmount / originalPrice) * 100;

  return Math.round(discountPercentage);
};
