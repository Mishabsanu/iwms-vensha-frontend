import axios from "axios";

export const getidApi = async () => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                withCredentials: true,
            },
        };
        const data = await axios.get(
            // `${process.env.REACT_APP_URL}/api/user/role-list`,
            `${process.env.REACT_APP_URL}/user/employee-id-auto-generate`,
            config
        );
        return data?.data?.result;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
};
