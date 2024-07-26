import React from "react";
import { MdOutlineKeyboardDoubleArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";
const Pagination = ({
  pageNumber,
  setPageNumber,
  totalItems,
  perPage,
  showItem,
}) => {
  const totalPage = Math.ceil(totalItems / perPage);
  let startPage = pageNumber;
  const diff = totalPage - pageNumber;
  if (diff <= showItem) startPage = totalPage - showItem;
  let endPage = startPage < 0 ? showItem : showItem + startPage;
  if (startPage <= 0) startPage = 1;

  const createBtn = () => {
    const btns = [];
    for (let i = startPage; i < endPage; i++) {
      btns.push(
        <li
          key={i}
          className={`${
            pageNumber === i
              ? "bg-[#f4b48a61] shadow-lg shadow-[#f4b48a27] text-white"
              : "bg-[#e2e2e2] hover:bg-[#e2e2e2] shadow-lg hover:text-white text-[#1e1e2c]"
          } w-[34px] h-[34px] rounded-full flex justify-center items-center cursor-pointer`}
          onClick={() => setPageNumber(i)}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className="flex gap-3">
      {pageNumber > 1 && (
        <li
          className="w-[34px] h-[34px] rounded-full flex justify-center items-center bg-[#00000031] text-[#1e1e2c] cursor-pointer"
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          <MdOutlineKeyboardDoubleArrowLeft />
        </li>
      )}
      {createBtn()}
      {pageNumber < totalPage && (
        <li
          className="w-[34px] h-[34px] rounded-full flex justify-center items-center bg-[#00000031] text-[#1e1e2c] cursor-pointer"
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          <MdOutlineKeyboardDoubleArrowRight />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
