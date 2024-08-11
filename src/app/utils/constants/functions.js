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



