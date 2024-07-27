import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { getNav } from "../navigation/index";
import { BiLogOutCircle } from "react-icons/bi";

const SideBar = ({ showSideBar, setShowSideBar }) => {
  const { pathname } = useLocation();
  const [allNav, setAllNav] = useState([]);

  useEffect(() => {
    const navs = getNav("admin");
    setAllNav(navs);
  }, []);

  return (
    <div>
      <div
        onClick={() => setShowSideBar(false)}
        className={`fixed duration-200 ${
          !showSideBar ? "invisible" : "visible"
        } w-screen h-screen bg-[#e2e2e2] top-0 left-0 z-10`}
      ></div>
      <div
        className={`w-[260px] fixed bg-[#e6e7fb] z-50 top-0 h-screen  transition-all ${
          showSideBar ? "left-0" : "-left-[260px] lg:left-0"
        } `}
      >
        <div>
          <div className="h-[100px] flex justify-center items-center">
            <Link to="/" className="w-[180px] h-[50px]">
              <img src="http://localhost:3000/images/fullLogo.png" alt="logo" />
            </Link>
          </div>
          <div className="mt-4 px-[16px] pl-0">
            <ul>
              {allNav.map((n, i) => (
                <li key={i} className="mb-2">
                  <Link
                    to={n.path}
                    className={`flex items-center gap-[12px] px-[12px] py-[9px] rounded-r-full transition-all duration-200 w-full ${
                      pathname === n.path
                        ? "bg-[#f29f6782] text-white shadow-lg"
                        : "text-[#1e1e2c] font-medium text-sm hover:bg-[#f29f6747] hover:text-white"
                    }`}
                  >
                    <span>{n.icon}</span>
                    <span className="text-sm">{n.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mb-7 px-[16px] pl-0">
          <button className="flex items-center gap-[12px] px-[12px] py-[9px] rounded-r-full w-full text-[#1e1e2c] font-medium text-sm hover:bg-[#f29f6747] hover:text-white transition-all duration-200">
            <BiLogOutCircle />
            <span>Sign out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
