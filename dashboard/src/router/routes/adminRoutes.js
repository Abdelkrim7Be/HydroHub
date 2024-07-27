import { lazy } from "react"; //lazy loading
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const Sellers = lazy(() => import("./../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("./../../views/admin/PaymentRequest"));
const InactiveSellers = lazy(() => import("../../views/admin/InactiveSellers"));

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
  {
    path: "/admin/dashboard/categories",
    element: <Category />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/sellers",
    element: <Sellers />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/payment-requests",
    element: <PaymentRequest />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/inactive-sellers",
    element: <InactiveSellers />,
    role: "admin",
  },
];
