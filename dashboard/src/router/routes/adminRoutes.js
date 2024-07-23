import { lazy } from "react"; //lazy loading
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));

export const adminRoutes = [
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
    role: "admin",
  },
];
