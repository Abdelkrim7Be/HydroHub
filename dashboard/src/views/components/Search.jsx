import React from "react";
import { IoSearchSharp } from "react-icons/io5";

const Search = ({ setPerPage, setSearchValue, searchValue }) => {
  return (
    <div>
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
            onChange={(e) => setSearchValue(e.target.value)}
            value={searchValue}
            type="text"
            className="px-3 py-2 outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-full shadow-lg focus:border-stone-300 overflow-hidden pl-10 placeholder-black"
            name="search"
            placeholder="Search"
          />
          <IoSearchSharp className="absolute top-1/2 left-3 transform -translate-y-1/2 text-[#1e1e2c]" />
        </div>
      </div>
    </div>
  );
};

export default Search;
