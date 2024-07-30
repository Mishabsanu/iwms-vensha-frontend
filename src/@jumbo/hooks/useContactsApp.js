import React from "react";
import ContactsAppContext from "@jumbo/utils/ContactsAppContext";

const useContactsApp = () => {
    return React.useContext(ContactsAppContext);
};

export default useContactsApp;