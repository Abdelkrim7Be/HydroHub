import { privateRoutes } from "./privateRoutes";
import MainLayout from "./../../layout/MainLayout";
import ProtectRoute from "./ProtectRoute";

export const getRoutes = () => {
  const protectedRoutes = privateRoutes.map((r) => ({
    ...r,
    element: <ProtectRoute route={r}>{r.element}</ProtectRoute>,
  }));

  return {
    path: "/",
    element: <MainLayout />,
    children: protectedRoutes,
  };
};
