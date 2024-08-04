import axios from "axios";

export const updatePallet = async (details, id) => {
    try {
        const config = {
            withCredentials: true,
            headers: {
                withCredentials: true,
            },
        };
        const data = await axios.post(
            `${process.env.REACT_APP_URL}/production-line/update-produntion-line-master?id=${id}`,
            details,
            config
        );
        return data;
    } catch (error) {
        // console.log(data)
        return error.response.data;
    }
};
