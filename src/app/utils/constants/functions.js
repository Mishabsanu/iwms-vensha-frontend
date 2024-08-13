export const dateFun = (originalDateString) => {
  const date = new Date(originalDateString);
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export const currentdate = new Date(Date.now());
export const formattedDate = `${
  currentdate.getMonth() + 1
}-${currentdate.getDate()}-${currentdate.getFullYear()}`;

export const displayDateFun = (originalDateString) => {
  const date = new Date(originalDateString);

  // Adjust for time zone offset
  const timeZoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - timeZoneOffset);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
};

export const displayDateAndTimeFun = (originalDateString) => {
  const date = new Date(originalDateString);

  // Adjust for time zone offset
  const timeZoneOffset = date.getTimezoneOffset();
  date.setMinutes(date.getMinutes() - timeZoneOffset);

  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const seconds = date.getSeconds().toString().padStart(2, "0");

  const formattedDateTime = `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime;
};

export const calculateExpirationDate = (manufactureDate, lifetime) => {
  // Parse the lifetime string (e.g., "12M" for 12 months)
  const lifetimeValue = parseInt(lifetime.slice(0, -1), 10);
  const lifetimeUnit = lifetime.slice(-1).toUpperCase();

  // Convert manufactureDate to a Date object
  const date = new Date(manufactureDate);

  // Calculate expiration date based on the unit
  switch (lifetimeUnit) {
    case "D": // Days
      date.setDate(date.getDate() + lifetimeValue);
      break;
    case "M": // Months
      date.setMonth(date.getMonth() + lifetimeValue);
      break;
    case "Y": // Years
      date.setFullYear(date.getFullYear() + lifetimeValue);
      break;
    default:
      throw new Error('Invalid lifetime unit. Use "D", "M", or "Y".');
  }

  // Format the expiration date as "YYYY-MM-DD"
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};
