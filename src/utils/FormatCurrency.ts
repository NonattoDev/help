const parseCurrency = (value: string): number => {
  const cleanedValue = value
    .replace(/[^\d,.-]/g, "")
    .replace(/\./g, "")
    .replace(",", ".");
  return parseFloat(cleanedValue);
};

export default parseCurrency;
