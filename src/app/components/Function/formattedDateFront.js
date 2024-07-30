export const uiDate = (date) => {
    // Assuming the date format is "dd-MM-yyyy", you need to convert it to "yyyy-MM-dd"
    const parts = date.split("-");
    if (parts.length === 3) {
      return `${parts[2]}-${parts[1]}-${parts[0]}`;
    }
    return null; // Return null if the date format is incorrect
  };