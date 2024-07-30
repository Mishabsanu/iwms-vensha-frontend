import axios from "axios";

export const addProductionLine = async (details) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                withCredentials: true,
            },
        };
        const data = await axios.post(
            `${process.env.REACT_APP_URL}/produntion-line/add-produntion-line-master`,
            details,
            config
        );
        // console.log(data);
        return data;
    } catch (error) {
        // console.log(error);
        return error.response;
    }
};
