import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "../Pagination";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import Search from "./../components/Search";
import { useDispatch, useSelector } from "react-redux";
import {
  getDiscountedProducts,
  deleteProduct,
} from "../../store/Reducers/productReducer";

const DiscountProducts = () => {
  const dispatch = useDispatch();
  const { products, totalProducts } = useSelector((state) => state.product);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [perPage, setPerPage] = useState(5);

  useEffect(() => {
    const obj = {
      perPage: parseInt(perPage),
      page: parseInt(currentPage),
      searchValue,
    };
    dispatch(getDiscountedProducts(obj)); // Fetch products (make sure your backend filters out products with no discount)
  }, [searchValue, currentPage, perPage, dispatch]);

  const handleDelete = (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[#1e1e2c] font-semibold text-lg mb-3">
        Discount Products
      </h1>
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <Search
          setPerPage={setPerPage}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
        />

        <div className="relative overflow-x-auto mt-5">
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
                  Category
                </th>
                <th scope="col" className="py-3 px-4">
                  Brand
                </th>
                <th scope="col" className="py-3 px-4">
                  Price
                </th>
                <th scope="col" className="py-3 px-4">
                  Discount
                </th>
                <th scope="col" className="py-3 px-4">
                  Stock
                </th>
                <th scope="col" className="py-3 px-4">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {products
                .filter((product) => product.discount > 0) // Filter products with discount > 0
                .map((elt, i) => (
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
                        src={elt.images[0]}
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
                      {elt.category}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {elt.brand}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      ${elt.price}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {elt.discount}%
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      {elt.stock}
                    </td>
                    <td
                      scope="row"
                      className="py-1 px-4 font-medium whitespace-nowrap"
                    >
                      <div className="flex justify-start items-start gap-4">
                        <Link
                          to={`/seller/dashboard/edit-product/${elt._id}`}
                          className="p-[10px] bg-[#f29f6731] rounded hover:shadow-lg hover:shadow-slate-300"
                        >
                          <FaEdit />
                        </Link>
                        <Link
                          onClick={() => handleDelete(elt._id)}
                          className="p-[10px] bg-[#f29f6731] rounded hover:shadow-lg hover:shadow-slate-300 cursor-pointer"
                        >
                          <FaTrash />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        {totalProducts <= perPage ? null : (
          <div className="w-full flex justify-end mt-4 bottom-4 right-4">
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItems={totalProducts}
              perPage={perPage}
              showItem={3}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountProducts;
