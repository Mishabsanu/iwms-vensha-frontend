export const getCurrentDate = () => {
  const currentDate = new Date(); // Get the current date
  currentDate.setUTCHours(0, 0, 0, 0); // Set hours, minutes, seconds, and milliseconds to 0
  const currentDateISOString = currentDate.toISOString();
  return currentDateISOString;
};
