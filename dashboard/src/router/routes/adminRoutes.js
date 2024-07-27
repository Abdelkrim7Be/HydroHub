import { lazy } from "react"; //lazy loading
const AdminDashboard = lazy(() => import("./../../views/admin/AdminDashboard"));
const Orders = lazy(() => import("./../../views/admin/Orders"));
const Category = lazy(() => import("./../../views/admin/Category"));
const Sellers = lazy(() => import("./../../views/admin/Sellers"));
const PaymentRequest = lazy(() => import("./../../views/admin/PaymentRequest"));
const InactiveSellers = lazy(() => import("../../views/admin/InactiveSellers"));
const SellerRequest = lazy(() => import("../../views/admin/SellerRequest"));
const SellerDetails = lazy(() => import("../../views/admin/SellerDetails"));
const Profile = lazy(() => import("../../views/admin/Profile"));
const ChatSeller = lazy(() => import("../../views/admin/ChatSeller"));

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
  {
    path: "/admin/dashboard/sellers-request",
    element: <SellerRequest />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/seller/details/:sellerId",
    element: <SellerDetails />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/profile",
    element: <Profile />,
    role: "admin",
  },
  {
    path: "/admin/dashboard/chat-seller",
    element: <ChatSeller />,
    role: "admin",
  },
];
