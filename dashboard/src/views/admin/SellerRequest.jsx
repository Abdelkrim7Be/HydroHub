import React from "react";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";

const SellerRequest = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Request</h1>
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <div className="flex justify-between items-center">
          <select
            onChange={(e) => setPerPage(parseInt(e.target.value))}
            className="px-4 py-2  outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-full shadow-lg focus:border-stone-300 overflow-hidden"
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
        <div className="mt-5 relative overflow-x-auto">
          <table className="w-full text-left text-[#1e1e2c] font-medium text-sm bg-[#e2e2e2] rounded-lg">
            <thead className="text-sm uppercase border-b border-[#7f7f7f] ">
              <tr>
                <th scope="col" className="py-3 px-4">
                  No
                </th>
                <th scope="col" className="py-3 px-4">
                  Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((elt, i) => (
                <tr className="border-b border-[#7f7f7f]">
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    {elt}
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    Soufiane Omari
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    soufianeomari@gmail.com
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <span>Inactive</span>
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    Pending
                  </td>
                  <td
                    scope="row"
                    className="py-2 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-start gap-4">
                      <Link className="p-[10px] bg-[#f29f6731] rounded hover:shadow-lg hover:shadow-slate-300">
                        <FaEye />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full flex justify-end mt-4 bottom-4 right-4">
          <Pagination
            pageNumber={currentPage}
            setPageNumber={setCurrentPage}
            totalItems={50}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default SellerRequest;
