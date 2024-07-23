import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { Toaster } from "react-hot-toast";
import { getRoutes } from "./router/routes";

function App() {
  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  return (
    <div>
      <Toaster position="top-right" />
      <Router allRoutes={allRoutes} />
    </div>
  );
}

export default App;
