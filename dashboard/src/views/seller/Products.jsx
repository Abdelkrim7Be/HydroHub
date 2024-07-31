import React, { useState } from "react";
import Search from "./../components/Search";

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#1e1e2c] font-semibold text-lg mb-3">
        All Products
      </h1>
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <Search setPerPage={setPerPage} />
      </div>
    </div>
  );
};

export default Products;
