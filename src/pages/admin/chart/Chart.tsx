import { useState, useEffect } from "react";
import { Tabs } from "antd";
import TabPane from "antd/es/tabs/TabPane";
import RevenueChart from "@/components/admin/chart/RevenueChart";
import DestinationChart from "@/components/admin/chart/DestinationChart";

const Chart = () => {
  type TabPosition = "top" | "right" | "bottom" | "left";

  const [tabPosition, setTabPosition] = useState<TabPosition>("left");

  // Effect lắng nghe resize để đổi vị trí tab
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setTabPosition("top");
      } else {
        setTabPosition("left");
      }
    };

    handleResize(); // Kiểm tra ngay lần đầu

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="mx-auto p-4 my-14 max-w-7xl">
      <Tabs tabPosition={tabPosition}>
        <TabPane
          tab={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              Revenue Chart
            </span>
          }
          key="1"
        >
          <RevenueChart />
        </TabPane>
        <TabPane
          tab={
            <span style={{ fontFamily: "Montserrat", fontWeight: 500 }}>
              Destination Chart
            </span>
          }
          key="2"
        >
          <DestinationChart />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Chart;
