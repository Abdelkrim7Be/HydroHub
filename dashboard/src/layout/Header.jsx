import React from "react";
import { FaList } from "react-icons/fa";

const Header = ({ showSideBar, setShowSideBar }) => {
  return (
    <div className="fixed top-0 left-0 w-full py-5 px-2 lg:px-7 z-40">
      <div className="ml-0 lg:ml-[260px] rounded-md h-[64px] flex justify-between items-center bg-[#e2e2e2] px-5 transition-all">
        <div
          onClick={() => setShowSideBar(!showSideBar)}
          className={`w-[40px] h-[40px] flex lg:hidden rounded-2xl bg-[#f29f6747] text-[#1e1e2c] font-medium text-sm hover:bg-[#f29f6782] hover:text-white shadow-lg justify-center items-center cursor-pointer transition-all duration-200`}
        >
          <FaList />
        </div>
      </div>
    </div>
  );
};

export default Header;
