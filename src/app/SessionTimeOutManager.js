import React, { useEffect, useState } from "react";

const SessionTimeoutManager = ({ children }) => {
  const [userIsActive, setUserIsActive] = useState(true);

  let inactivityTimer;

  const setUserActivity = () => {
    setUserIsActive(true);

    // Reset the inactivity timer
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(logoutUser, 300 * 60 * 1000); // 10 minutes timeout
  };

  const logoutUser = () => {
    // Perform logout or redirect to the login page
    // For example, you can use react-router-dom for navigation

    window.location.href = "/";
    sessionStorage.clear();
    localStorage.clear();
  };

  useEffect(() => {
    // Attach event listeners for user activity (mouse movements and keyboard events)
    document.addEventListener("mousemove", setUserActivity);
    document.addEventListener("keydown", setUserActivity);

    // Start the initial inactivity timer
    inactivityTimer = setTimeout(logoutUser, 300 * 60 * 1000); // 10 minutes timeout

    // Cleanup event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", setUserActivity);
      document.removeEventListener("keydown", setUserActivity);
      clearTimeout(inactivityTimer);
    };
  }, []);

  return <>{children}</>;
};

export default SessionTimeoutManager;
