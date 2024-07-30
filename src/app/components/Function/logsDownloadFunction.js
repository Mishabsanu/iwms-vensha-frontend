import axios from "axios";

export const handleLogs = async (apiurl, filename) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "blob", // Ensure responseType is set to 'blob' for file download
    };

    const response = await axios.get(
      `${process.env.REACT_APP_URL}/${apiurl}`,
      config
    );

    if (response.status !== 200) {
      throw new Error("Failed to fetch user logs");
    }

    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `${filename}_logs.xlsx`); // Set the file name
    document.body.appendChild(link);

    // Programmatically click the link to trigger the download
    link.click();

    // Clean up: remove the temporary link
    link.parentNode.removeChild(link);
  } catch (error) {
    console.error("Error downloading file:", error);
  } finally {
  }
};
