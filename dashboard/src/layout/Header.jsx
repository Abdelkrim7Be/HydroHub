import React from "react";
import { FaList } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";

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
        <div className="flex justify-between items-center w-full p-4">
          <div className="hidden md:block">
            <h1 className="text-lg font-light text-[#1e1e2c]">
              Good Morning,{" "}
              <span className="font-semibold text-[#1e1e2c]">John Doe</span>
            </h1>
            <p className="text-sm text-[#1e1e2c]">Your control dashboard</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block relative">
              <input
                type="text"
                className="px-3 py-2 outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-full shadow-lg focus:border-stone-300 overflow-hidden pl-10"
                name="search"
                placeholder="Search now"
              />
              <IoSearchSharp className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1e1e2c]" />
            </div>

            <div className=" flex items-center gap-2 md:ml-auto">
              <img
                src="http://localhost:3000/images/admin.jpg"
                alt="Profile"
                className="w-[45px] h-[45px] rounded-full overflow-hidden"
              />
              <span className="text-[#1e1e2c] font-medium hidden md:inline">
                Admin
              </span>
              <span className="text-[#1e1e2c] font-medium md:hidden">
                John Doe
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
