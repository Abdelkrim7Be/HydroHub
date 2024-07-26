import React from "react";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
          <div className="flex justify-between items-center">
            <select
              onChange={(e) => setPerPage(parseInt(e.target.value))}
              className="px-4 py-2  outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-full shadow-lg focus:border-stone-300 overflow-hidden pl-10"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
            </select>
            <div className="hidden md:block relative">
              <input
                type="text"
                className="px-3 py-2 outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-full shadow-lg focus:border-stone-300 overflow-hidden pl-10 placeholder-black"
                name="search"
                placeholder="Search"
              />
              <IoSearchSharp className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1e1e2c]" />
            </div>
          </div>
          <div className="relative mt-5 overflow-x-auto">
            <div className="w-full font-medium text-sm text-left [#1e1e2c]">
              <div className="text-sm text-[#1e1e2c] uppercase border-b border-[#7f7f7f]">
                <div className="flex justify-between items-center">
                  <div className="py-3 w-[25%] font-bold">Order Id</div>
                  <div className="py-3 w-[13%] font-bold">Price</div>
                  <div className="py-3 w-[18%] font-bold">Payment Status</div>
                  <div className="py-3 w-[18%] font-bold">Order Status</div>
                  <div className="py-3 w-[18%] font-bold">Action</div>
                  <div className="py-3 w-[8%] font-bold">
                    <FaArrowDownWideShort />{" "}
                  </div>
                </div>
              </div>

              <div className=" text-[#1e1e2c]">
                <div className="flex justify-between items-start border-b border-[#7f7f7f]">
                  <div className="py-3 w-[25%] font-semibold whitespace-nowrap">
                    #74589
                  </div>
                  <div className="py-3 w-[13%] font-semibold whitespace-nowrap">
                    $452
                  </div>
                  <div className="py-3 w-[18%] font-semibold whitespace-nowrap">
                    Pending
                  </div>
                  <div className="py-3 w-[18%] font-semibold whitespace-nowrap">
                    Pending
                  </div>
                  <div className="py-3 w-[18%] font-semibold whitespace-nowrap">
                    <Link>View</Link>
                  </div>
                  <div className="py-3 w-[8%] font-semibold whitespace-nowrap">
                    <FaArrowDownWideShort />{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
