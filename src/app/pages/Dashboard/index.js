import Div from "@jumbo/shared/Div";
import axios from "axios";
import { useEffect, useState } from "react";
import CrmDashboard from "./crm/CrmDashboard";
import CryptoDashboard from "./crypto/CryptoDashboard";
import ListingDashboard from "./listing/ListingDashboard";
import MiscDashboard from "./misc/MiscDashboard";
import NewsDashboard from "./news/NewsDashboard";

const Dashboard = () => {
  const [statusCount, setStatusCount] = useState({});
  const [forkliftTaskCount, setForkliftTaskCount] = useState({});
  const getAllStatusCount = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const body = {};
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/production/get-all-status-count`,
        body,
        config
      );
      // const response = await Axios.get(`/production/get-all-status-count`);
      setStatusCount(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const getAllForkLiftTaskCount = async () => {
    try {
      const config = {
        withCredentials: true,
        headers: {
          withCredentials: true,
        },
      };
      const body = {};
      const response = await axios.post(
        `${process.env.REACT_APP_URL}/production/get-all-forklift-task-count`,
        body,
        config
      );

      setForkliftTaskCount(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  console.log(forkliftTaskCount, "forkliftTaskCount");

  useEffect(() => {
    getAllStatusCount();
    getAllForkLiftTaskCount();
  }, []);
  return (
    <Div>
      {/* <Div sx={{ mb: 5 }}>
        <EcommerceDashboard />
      </Div> */}

      <Div sx={{ mb: 5 }}>
        <ListingDashboard data={statusCount} forkliftTaskCount={forkliftTaskCount} />
      </Div>
      <Div sx={{ mb: 5 }}>
        <CryptoDashboard />
      </Div>
      <Div sx={{ mb: 5 }}>
        <MiscDashboard />
      </Div>
      <Div sx={{ mb: 5 }}>
        <NewsDashboard />
      </Div>
      <Div>
        <CrmDashboard />
      </Div>
    </Div>
  );
};

export default Dashboard;
