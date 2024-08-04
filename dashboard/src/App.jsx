import { useEffect, useState } from "react";
import Router from "./router/Router";
import publicRoutes from "./router/routes/publicRoutes";
import { Toaster } from "react-hot-toast";
import { getRoutes } from "./router/routes";
import { useDispatch } from "react-redux";
import { getUserInfo } from "./store/Reducers/authReducer";
import { useSelector } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const [allRoutes, setAllRoutes] = useState([...publicRoutes]);
  // console.log(allRoutes);
  useEffect(() => {
    const routes = getRoutes();
    setAllRoutes([...allRoutes, routes]);
  }, []);
  useEffect(() => {
    if (token) {
      dispatch(getUserInfo());
    }
  }, []);

  return (
    <div>
      <Toaster position="top-right" />
      <Router allRoutes={allRoutes} />
    </div>
  );
}

export default App;
