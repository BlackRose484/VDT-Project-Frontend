import { useState } from "react";
import { Tabs } from "antd";
import { UserOutlined, CrownOutlined } from "@ant-design/icons";
import AdminList from "./AdminList";
import CustomerList from "./CustomerList";

const UserManagement = () => {
  const [activeKey, setActiveKey] = useState("1");

  return (
    <div className="relative w-full h-screen">
      <img
        src="/add_flight_background.png"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover -z-10 opacity-30"
      />

      <div className="w-full h-full flex relative z-10">
        <div className="flex-grow bg-white bg-opacity-80 backdrop-blur-md p-4">
          <Tabs
            tabPosition="left"
            activeKey={activeKey}
            onChange={(key) => setActiveKey(key)}
            tabBarGutter={16}
            className="h-full"
            items={[
              {
                key: "1",
                label: (
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeKey === "1"
                        ? "bg-blue-100 text-blue-700 shadow"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <UserOutlined />
                    User List
                  </div>
                ),
                children: (
                  <div className="p-4 h-full overflow-auto">
                    <CustomerList />
                  </div>
                ),
              },
              {
                key: "2",
                label: (
                  <div
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeKey === "2"
                        ? "bg-blue-100 text-blue-700 shadow"
                        : "text-gray-700 hover:bg-blue-50"
                    }`}
                  >
                    <CrownOutlined />
                    Admin List
                  </div>
                ),
                children: (
                  <div className="p-4 h-full overflow-auto">
                    <AdminList />
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

export default UserManagement;
