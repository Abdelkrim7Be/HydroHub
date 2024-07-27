import React from "react";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";

const Category = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);

  return (
    <div>
      <div className="px-2 lg:px-7 pt-5">
        <div className="flex flex-wrap w-full">
          <div className="w-full lg:w-7/12">
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
                        Image
                      </th>
                      <th scope="col" className="py-3 px-4">
                        Name
                      </th>
                      <th scope="col" className="py-3 px-4">
                        Active
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[1, 2, 3, 4, 5].map((elt, i) => (
                      <tr>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          {elt}
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          <img
                            className="w-[45px] h-[45px]"
                            src={`http://localhost:3000/images/category/${elt}.jpg`}
                            alt=""
                          />
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          Adaptateur Abride
                        </td>
                        <td
                          scope="row"
                          className="py-1 px-4 font-medium whitespace-nowrap"
                        >
                          <div className="flex justify-start items-start gap-4">
                            <Link className="p-[10px] bg-[#f29f6731] rounded hover:shadow-lg hover:shadow-slate-300">
                              <FaEdit />
                            </Link>
                            <Link className="p-[10px] bg-[#f29f6731] rounded hover:shadow-lg hover:shadow-slate-300">
                              <FaTrash />
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
          <div
            className={`w-[320px] lg:w-5/12 translate-x-100 lg:relative lg:right-0 fixed ${
              show ? "right-0" : "-right-[340px]"
            } z-20 top-0 transition-all duration-500`}
          >
            <div className="w-full pl-5">
              <div className="bg-[#e2e2e2] lg:rounded-md h-screen lg:h-auto px-3 py-2 text-[#1e1e2c]">
                <h1 className="text-[#1e1e2c] font-semibold text-x mb-4 w-full text-center">
                  Add Category
                </h1>
                <form>
                  <div className="flex flex-col w-full gap-1 mb-3 ">
                    <label htmlFor="name">Category Name</label>
                    <input
                      className="px-3 py-2 outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-md shadow-lg focus:border-stone-300 overflow-hidden pl-4 placeholder-black"
                      type="text"
                      id="name"
                      name="category_name"
                      placeholder="Category Name"
                    />
                  </div>
                  <div>
                    <label
                      className="flex justify-center items-center flex-col h-[250px] cursor-pointer border border-dashed border-[#f29f67]"
                      htmlFor="image"
                    >
                      <span>
                        <FaImage />
                      </span>
                      <span>Select Image</span>
                    </label>
                    <input
                      className="hidden"
                      type="file"
                      name="image"
                      id="image"
                    />
                    <div>
                      <button className="bg-[#c28f6d] w-full hover:shadow-slate-300 hover:shadow-md text-white rounded-md px-7 py-2 my-3">
                        Add Category
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Category;
