import React from "react";
import createRoutes from "./routes";
import SearchBar from "./components/SearchBar";
import SearchBarSimple from "./components/SearchBarSimple";
import Header from "./components/Header";

const App: React.FC = () => {
  const routes = createRoutes();
  return <div>{routes}</div>;
};

export default App;
