import React, { useEffect } from "react";
import { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";
import { FaArrowDownWideShort } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import { FaImage } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { get_inactive_sellers } from "../../store/Reducers/sellerReducer";
import Search from "./../components/Search";

const InactiveSellers = () => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  const [show, setShow] = useState(false);

  const { sellers, totalSellers } = useSelector((state) => state.seller);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(get_inactive_sellers(obj));
  }, [searchValue, currentPage, perPage]);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Inactive Seller</h1>
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <Search
          setPerPage={setPerPage}
          setSearchValue={setSearchValue}
          searchValue={searchValue}
        />
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
                  Shop Name
                </th>
                <th scope="col" className="py-3 px-4">
                  Payment Status
                </th>
                <th scope="col" className="py-3 px-4">
                  Email
                </th>
                <th scope="col" className="py-3 px-4">
                  Devision
                </th>
                <th scope="col" className="py-3 px-4">
                  District
                </th>
                <th scope="col" className="py-3 px-4">
                  Region
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sellers.map((elt, i) => (
                <tr key={i}>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {i + 1}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <img
                      className="w-[45px] h-[45px]"
                      src={
                        elt?.image || `http://localhost:3000/images/seller.png`
                      }
                      alt=""
                    />
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {elt.name}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {elt?.shopInfo?.shopName || "HMM"}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <span>{elt.payment}</span>
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {elt.email}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {elt?.shopInfo?.divisionName || "NP"}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {elt?.shopInfo?.districtName || "NP"}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    {elt?.shopInfo?.region || "NP"}
                  </td>
                  <td
                    scope="row"
                    className="py-1 px-4 font-medium whitespace-nowrap"
                  >
                    <div className="flex justify-start items-start gap-4">
                      <Link
                        to={`/admin/dashboard/seller/details/${elt._id}`}
                        className="p-[10px] bg-[#f29f6731] rounded hover:shadow-lg hover:shadow-slate-300"
                      >
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
            totalItems={totalSellers}
            perPage={perPage}
            showItem={3}
          />
        </div>
      </div>
    </div>
  );
};

export default InactiveSellers;
