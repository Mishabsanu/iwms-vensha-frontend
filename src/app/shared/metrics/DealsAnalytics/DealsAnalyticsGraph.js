import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Div from "@jumbo/shared/Div";
import { capitalizeFLetter } from "@jumbo/utils";

const DealAnalyticsGraph = ({ data }) => {
  // Log the data to inspect its format
  console.log("Data received:", data);

  // Check if data is an array and has the correct structure
  if (
    !Array.isArray(data) ||
    data.some(
      (item) =>
        typeof item.pendingCount !== "number" ||
        typeof item.verifiedCount !== "number" ||
        typeof item.first_name !== "string" ||
        typeof item.last_name !== "string"
    )
  ) {
    console.error(
      "Invalid data format. Expected an array of objects with pendingCount, verifiedCount, first_name, and last_name."
    );
    return <Div>No data available</Div>; // Provide fallback UI if data is invalid
  }

  // Transform the data into the format required by BarChart
  const transformedData = data.map((user) => ({
    name: `${user.first_name} ${user.last_name}`,
    Pending: user.pendingCount,
    Verified: user.verifiedCount,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart
        data={transformedData}
        margin={{ top: 20, right: 20, left: 20, bottom: 20 }}
      >
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip
          animationEasing={"ease-in-out"}
          content={({ active, payload }) => {
            return active ? (
              <Div sx={{ color: "common.white" }}>
                {payload.map((row, index) => (
                  <div
                    key={index}
                    className={index !== payload.length - 1 ? "mb-1" : ""}
                  >
                    <div
                      style={{
                        color: row.color,
                        fontSize: 12,
                        letterSpacing: 1,
                        textTransform: "uppercase",
                      }}
                    >
                      {capitalizeFLetter(row.name)}
                 
                    </div>
                    <div style={{ color: row.color }}>{row.value}</div>
                  </div>
                ))}
              </Div>
            ) : null;
          }}
          wrapperStyle={{
            background: "rgba(255,255,255,0.9)",
            borderRadius: 4,
            padding: "5px 8px",
            fontWeight: 500,
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
        />
        <Bar dataKey="Pending" stackId="a" fill="#1E88E5" barSize={20} />
        <Bar dataKey="Verified" stackId="a" fill="#E91E63" barSize={20} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default DealAnalyticsGraph;
