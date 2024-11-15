import axios from "axios";

export const updateCustomerType = async (details, id) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                withCredentials: true,
            },
        };
        const data = await axios.post(
            `${process.env.REACT_APP_URL}/customer-type/update-customer-type-master?id=${id}`,
            details,
            config
        );
        return data;
    } catch (error) {
        // console.log(data)
        return error.response.data;
    }
};
