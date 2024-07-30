import axios from "axios";

export const revertInventoryTaka = async (restoringInventory) => {
  try {
    const config = {
      withCredentials: true,
      headers: {
        withCredentials: true,
      },
    };
    const res = await axios.patch(
      `${process.env.REACT_APP_URL}/api/order/retrieved-quantity`,
      { items: restoringInventory },
      config
    );

    if (res.status == 200) {
      localStorage.clear("orderData");
    }
  } catch (error) {
    if (error) {
      return error;
    }
  }
};
