import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddProduct = () => {
  const categories = [
    {
      id: 1,
      name: "Pompes_1",
    },
    {
      id: 2,
      name: "Pompes_2",
    },
    {
      id: 3,
      name: "Pompes_3",
    },
    {
      id: 4,
      name: "Pompes_4",
    },
    {
      id: 5,
      name: "Pompes_5",
    },
  ];

  const [catShow, setCatShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState(categories);
  const [searchValue, setSearchValue] = useState("");

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const categorySearch = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    if (value) {
      let searchValue = allCategory.filter(
        (cat) => cat.name.toLowerCase().indexOf(value.toLowerCase()) > -1
      );
      setAllCategory(searchValue);
    } else {
      setAllCategory(categories);
    }
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#1e1e2c] text-xl font-semibold">Add Product</h1>
          <Link
            className="bg-[#f29f6782] shadow-lg hover:shadow-slate-300 px-7 py-2 curousal-pointer text-white rounded-md text-sm my-2"
            to="/all-products"
          >
            All Products
          </Link>
        </div>
        <div>
          <form>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text[#1e1e2c]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="name">Product Name</label>
                <input
                  className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                  onChange={inputHandler}
                  value={state.name}
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Product Name"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="brand">Product Brand</label>
                <input
                  className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                  onChange={inputHandler}
                  value={state.brand}
                  type="text"
                  name="brand"
                  id="brand"
                  placeholder="Product Brand"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text[#1e1e2c]">
              <div className="flex flex-col w-full gap-1 relative">
                <label htmlFor="category">Category</label>
                <input
                  readOnly
                  onClick={() => setCatShow(!catShow)}
                  className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                  onChange={inputHandler}
                  value={category}
                  type="text"
                  id="category"
                  placeholder="--Select Category--"
                />
                <div
                  className={`absolute top-[102%] w-full transition-all mt-2 ${
                    catShow ? "scale-100" : "scale-0"
                  }`}
                >
                  <div className="w-full px-4 py-2 fixed bg-white rounded-md">
                    <input
                      value={searchValue}
                      onChange={categorySearch}
                      className="px-3 py-1 w-full outline-none border bg-[#f29f6731] text-[#1e1e2c] focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-md shadow-lg focus:border-stone-300 overflow-hidden placeholder-black"
                      type="text"
                      placeholder="Search"
                    />
                    <div className="pt-5"></div>
                    <div className="flex justify-start items-start flex-col h-[200px] overflow-x-scrool">
                      {allCategory.map((cat, i) => (
                        <span
                          className={`px-4 py-2 hover:bg-[#f29f6731]  hover:shadow-lg w-full cursor-pointer ${
                            category === cat.name && "bg-[#f29f6731]"
                          }`}
                          onClick={() => {
                            setCatShow(false);
                            setCategory(cat.name);
                            setSearchValue("");
                            setAllCategory(categories);
                          }}
                          key={cat.id}
                        >
                          {cat.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="stock">Product Stock</label>
                <input
                  className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                  onChange={inputHandler}
                  value={state.stock}
                  type="text"
                  name="stock"
                  id="stock"
                  placeholder="Product Stock"
                />
              </div>
            </div>
            <div className="flex flex-col mb-3 md:flex-row gap-4 w-full text[#1e1e2c]">
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="price">Price</label>
                <input
                  className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                  onChange={inputHandler}
                  value={state.price}
                  type="number"
                  name="price"
                  id="price"
                  placeholder="Price"
                />
              </div>
              <div className="flex flex-col w-full gap-1">
                <label htmlFor="discount">Discount</label>
                <input
                  className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                  onChange={inputHandler}
                  value={state.discount}
                  type="number"
                  name="discount"
                  id="discount"
                  placeholder="Discount"
                />
              </div>
            </div>
            <div className="flex flex-col w-full gap-1">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                onChange={inputHandler}
                value={state.description}
                name="description"
                id="description"
                placeholder="Description"
                cols="10"
                rows="4"
              ></textarea>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
