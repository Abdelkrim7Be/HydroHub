import { MdDashboard, MdPayment } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { FaUser, FaUsers, FaUserTimes } from "react-icons/fa";
import { FaCodePullRequest } from "react-icons/fa6";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { IoIosChatbubbles } from "react-icons/io";
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
    title: "Seller Requests",
    icon: <FaCodePullRequest />,
    role: "admin",
    path: "/admin/dashboard/deactive-sellers",
  },
  {
    id: 8,
    title: "Profil",
    icon: <FaUser />,
    role: "admin",
    path: "/admin/dashboard/profil",
  },
  {
    id: 9,
    title: "Live Chat",
    icon: <IoIosChatbubbles />,
    role: "admin",
    path: "/admin/dashboard/chat-seller",
  },
];
