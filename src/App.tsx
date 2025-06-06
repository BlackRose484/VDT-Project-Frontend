import React from "react";
import createRoutes from "./routes";
import { ToastContainer } from "react-toastify";

const App: React.FC = () => {
  const routes = createRoutes();
  return (
    <div>
      {routes}
      <ToastContainer />
    </div>
  );
};

export default App;
