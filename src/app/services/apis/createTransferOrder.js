export const createTransferOrder = async (body) => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const data = await axios.post(
        `${process.env.REACT_APP_URL}/outbound/list-crossDockPickup`,
        body,
        config
      );
      return data;
    } catch (error) {
      // console.log(data)
      return error.response.data;
    }
  };