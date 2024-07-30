export const wasteSqmPercentage = (totalSqm, wasteSqm) => {
  // Calculate the wastage percentage
  const wastagePercentage = parseFloat(
    ((wasteSqm / totalSqm) * 100).toFixed(2)
  );

  return wastagePercentage;
};
