import Div from "@jumbo/shared/Div";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";

const OfflineMessage = () => {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      Swal.close(); // Close any existing SweetAlert2 dialogs when the user comes online
    };
    const handleOffline = () => setIsOnline(false);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  useEffect(() => {
    if (!isOnline) {
      Swal.fire({
        icon: "error",
        title: "You are offline",
        text: "Please check your internet connection.",
        showConfirmButton: false,
        allowOutsideClick: false,
      });
    }
  }, [isOnline]);

  return (
    !isOnline && (
      <Div
        sx={{
          height: "100vh",
          width: "100vw",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: "99999",
        }}
      ></Div>
    )
  ); // Return null as the component doesn't need to render any JSX directly
};

export default OfflineMessage;
