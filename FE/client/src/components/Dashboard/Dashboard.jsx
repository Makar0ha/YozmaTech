import React from "react";
import Widget from "./Widget";
import { LineChart } from "@mui/x-charts/LineChart";
import { BarChart } from "@mui/x-charts/BarChart";
import { trasformData } from "../../common/data";
import { TwitterOutlined, CopyOutlined, ExclamationCircleOutlined, HomeOutlined } from "@ant-design/icons";
import "../../css/Dashboard.css";

const Dashboard = ({ reports }) => {
  const insertData = trasformData(reports);
  const descriptions = [
    "Reports amount",
    "Partner count",
    "Countries count",
    "Reports rate",
    "Weekday breakdown",
    "Breakdown by countries",
    "Breakdown by category",
  ];
  const smallWidgetStyle = {
    scale: "500%",
    borderRadius: '2px',
    color: 'white'
  }

  return (
    <div>
      <div className="widget-container">
        <Widget
          description={descriptions[0]}
          data={insertData.reportsAmount}
          icon={<CopyOutlined style={{ ...smallWidgetStyle, background: 'orange' }} />}
        />
        <Widget
          description={descriptions[1]}
          date={insertData.earliestDate}
          data={insertData.partnerCount}
          icon={<HomeOutlined style={{ ...smallWidgetStyle, background: 'green' }} />}
        />
        <Widget
          description={descriptions[2]}
          data={insertData.countriesCount}
          icon={<ExclamationCircleOutlined style={{ ...smallWidgetStyle, background: 'red' }} />}
        />
        <Widget
          description={descriptions[3]}
          data={insertData.reportsRate}
          icon={<TwitterOutlined style={{ ...smallWidgetStyle, background: 'rgb(18,184,206)' }} />}
        />
      </div>
      <div className="chart-container">
        <Widget
          date={insertData.earliestDate}
          description={descriptions[4]}
        >
          <LineChart
            height={300}
            series={[{ data: Object.values(insertData.weekdayBreakdown) }]}
            xAxis={[
              {
                scaleType: "point",
                data: Object.keys(insertData.weekdayBreakdown),
              },
            ]}
          />
        </Widget>
        <Widget
          date={insertData.earliestDate}
          description={descriptions[5]}
        >
          <BarChart
            height={300}
            series={[{ data: Object.values(insertData.countriesBreakdown) }]}
            xAxis={[{ scaleType: "band", data: Object.keys(insertData.countriesBreakdown) }]}
          />
        </Widget>
        <Widget
          date={insertData.earliestDate}
          description={descriptions[6]}
        >
          <LineChart
            height={300}
            series={[{ data: Object.values(insertData.categoryBreakdown) }]}
            xAxis={[{ scaleType: "point", data: Object.keys(insertData.categoryBreakdown) }]}
          />
        </Widget>
      </div>
    </div>
  );
};

export default Dashboard;
