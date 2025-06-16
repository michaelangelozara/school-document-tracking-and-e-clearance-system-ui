export const parseCurrency = (value: string): number => {
  const numericString = value.replace(/[^\d.-]/g, ""); // Removes ₱ and other non-numeric characters
  return parseFloat(numericString);
};
