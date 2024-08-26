import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideBar from "./SideBar";
import { socket } from "../utilities/utilities";
import { useDispatch, useSelector } from "react-redux";
import { updateSellers } from "../store/Reducers/chatReducer";

const MainLayout = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo && userInfo.role === "seller") {
      socket.emit("add_seller", userInfo._id, userInfo);
    } else {
      socket.emit("add_admin", userInfo);
    }
  }, [userInfo]);

  useEffect(() => {
    socket.on("activeSeller", (sellers) => {
      dispatch(updateSellers(sellers));
    });
  }, [dispatch]);
  const [showSideBar, setShowSideBar] = useState(false);
  return (
    <div className="bg-[#f4f4f4] w-full min-h-screen">
      <Header showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <SideBar showSideBar={showSideBar} setShowSideBar={setShowSideBar} />
      <div className="ml-0 lg:ml-[260px] pt-[95px] transition-all">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
