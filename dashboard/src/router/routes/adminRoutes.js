import { lazy } from "react"; //lazy loading
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/orders",
    element: <Orders />,
    role: "admin",
  },
];
