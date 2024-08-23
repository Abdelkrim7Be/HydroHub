import { MdDashboard, MdPayment } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaUser, FaUsers, FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { MdDiscount } from "react-icons/md";
import { IoChatbubblesOutline } from "react-icons/io5";

export const allNav = [
  {
    id: 1,
    title: "Dashboard",
    icon: <MdDashboard />,
    role: "admin",
    path: "/admin/dashboard",
  },
  {
    id: 2,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "admin",
    path: "/admin/dashboard/orders",
  },
  {
    id: 3,
    title: "Category",
    icon: <BiCategory />,
    role: "admin",
    path: "/admin/dashboard/categories",
  },
  {
    id: 4,
    title: "Sellers",
    icon: <FaUsers />,
    role: "admin",
    path: "/admin/dashboard/sellers",
  },
  {
    id: 5,
    title: "Payment Requests",
    icon: <MdPayment />,
    role: "admin",
    path: "/admin/dashboard/payment-requests",
  },
  {
    id: 6,
    title: "Inactive Seller",
    icon: <FaUserTimes />,
    role: "admin",
    path: "/admin/dashboard/inactive-sellers",
  },
  {
    id: 7,
    title: "Seller Request",
    icon: <FaCodePullRequest />,
    role: "admin",
    path: "/admin/dashboard/sellers-request",
  },
  {
    id: 8,
    title: "Profile",
    icon: <FaUser />,
    role: "admin",
    path: "/admin/dashboard/profile",
  },
  {
    id: 9,
    title: "Live Chat",
    icon: <IoIosChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/chat-seller",
  },
  {
    id: 10,
    title: "Dashboard",
    icon: <MdDashboard />,
    role: "seller",
    path: "/seller/dashboard",
  },
  {
    id: 11,
    title: "Add Product",
    icon: <MdOutlineProductionQuantityLimits />,
    role: "seller",
    path: "/seller/dashboard/add-product",
  },
  {
    id: 12,
    title: "All Products",
    icon: <MdOutlineProductionQuantityLimits />,
    role: "seller",
    path: "/seller/dashboard/products",
  },
  {
    id: 13,
    title: "Discount Product",
    icon: <MdDiscount />,
    role: "seller",
    path: "/seller/dashboard/discount-products",
  },
  {
    id: 14,
    title: "Orders",
    icon: <AiOutlineShoppingCart />,
    role: "seller",
    path: "/seller/dashboard/orders",
  },
  {
    id: 15,
    title: "Payments",
    icon: <MdPayment />,
    role: "seller",
    path: "/seller/dashboard/payments",
  },
  {
    id: 16,
    title: "Profile",
    icon: <FaUser />,
    role: "seller",
    path: "/seller/dashboard/profile",
  },
  {
    id: 17,
    title: "Chat-Customer",
    icon: <IoIosChatbubbles />,
    role: "seller",
    path: "/seller/dashboard/chat-customer",
  },
  {
    id: 18,
    title: "Chat-Support",
    icon: <IoChatbubblesOutline />,
    role: "seller",
    path: "/seller/dashboard/chat-support",
  },
];
