import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaImage } from "react-icons/fa6";
import { IoMdCloseCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getCategory } from "../../store/Reducers/categoryReducer";
import LoadingSpinner from "./../../layout/loadingSpinner";
import { addProduct, messageClear } from "../../store/Reducers/productReducer";
import { overrideStyle } from "../../utilities/utilities";
import { toast } from "react-hot-toast";

const AddProduct = () => {
  const dispatch = useDispatch();
  const { loader, successMessage, errorMessage } = useSelector(
    (state) => state.product
  );
  const { categories } = useSelector((state) => state.category);
  // const categories = [
  //   {
  //     id: 1,
  //     name: "Pompes_1",
  //   },
  //   {
  //     id: 2,
  //     name: "Pompes_2",
  //   },
  //   {
  //     id: 3,
  //     name: "Pompes_3",
  //   },
  //   {
  //     id: 4,
  //     name: "Pompes_4",
  //   },
  //   {
  //     id: 5,
  //     name: "Pompes_5",
  //   },
  // ];

  const [catShow, setCatShow] = useState(false);
  const [category, setCategory] = useState("");
  const [allCategory, setAllCategory] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [images, setImages] = useState([]);
  const [imageShow, setImageShow] = useState([]);

  const [state, setState] = useState({
    name: "",
    description: "",
    discount: "",
    price: "",
    brand: "",
    stock: "",
  });

  useEffect(() => {
    dispatch(
      getCategory({
        searchValue: "",
        perPage: "",
        page: "",
      })
    );
  }, []);

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

  const imageHandler = (e) => {
    const files = e.target.files;
    const length = files.length;
    if (length > 0) {
      setImages([...images, ...files]);
      let imageUrl = [];
      for (let i = 0; i < length; i++) {
        imageUrl.push({ url: URL.createObjectURL(files[i]) });
      }
      setImageShow([...imageShow, ...imageUrl]);
    }
    // console.log(e.target.files);
  };

  // console.log(images);
  // console.log(imageShow);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
      setState({
        name: "",
        description: "",
        discount: "",
        price: "",
        brand: "",
        stock: "",
      });

      setCategory("");
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  const changeImage = (img, index) => {
    if (img) {
      let tempUrl = imageShow;
      let tempImages = images;
      tempImages[index] = img;
      tempUrl[index] = { url: URL.createObjectURL(img) };
      setImageShow([...tempUrl]);
      setImages([...tempImages]);
    }
  };

  const removeImage = (i) => {
    const selectKeepingImages = images.filter((img, index) => index !== i);
    const selectKeepingImagesUrl = imageShow.filter(
      (img, index) => index !== i
    );

    setImages(selectKeepingImages);
    setImageShow(selectKeepingImagesUrl);
  };

  const addingProduct = (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Adding all our field data into our formData area
    formData.append("name", state.name);
    formData.append("description", state.description);
    formData.append("discount", state.discount);
    formData.append("price", state.price);
    formData.append("brand", state.brand);
    formData.append("stock", state.stock);
    formData.append("shopName", "HMM");
    formData.append("category", category);
    // formData.append("name", state.name);
    for (let i = 0; i < images.length; i++) {
      formData.append("images", images[i]);
    }
    // console.log(state);
    dispatch(addProduct(formData));
  };

  useEffect(() => {
    setAllCategory(categories);
  }, [categories]);

  // console.log(allCategory);

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <div className="flex justify-between items-center pb-4">
          <h1 className="text-[#1e1e2c] text-xl font-semibold">Add Product</h1>
          <Link
            className="bg-[#f29f6782] shadow-lg hover:shadow-slate-300 px-7 py-2 curousal-pointer text-white rounded-md text-sm my-2"
            to="/seller/dashboard/products"
          >
            All Products
          </Link>
        </div>
        <div>
          <form onSubmit={addingProduct}>
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
            <div className="flex flex-col w-full gap-1 mb-5">
              <label htmlFor="description">Description</label>
              <textarea
                className="w-full outline-none bg-white flex items-center border border-gray-50 rounded-lg p-2"
                onChange={inputHandler}
                value={state.description}
                name="description"
                id="description"
                placeholder="Description"
                cols="5"
                rows="4"
              ></textarea>
            </div>
            <div className="grid lg:grid-col-4 grid-cols-1 md:grid-cols-3 sm:grid-cols-2 sm:gap-4 md:gap-4 gap-3 w-full text-[#1e1e2c] mb-4">
              {imageShow.map((img, i) => (
                <div className="h-[180px] relative" key={i}>
                  <label htmlFor={i}>
                    <img
                      className="w-full h-full rounded-sm"
                      src={img.url}
                      alt=""
                    />
                  </label>
                  <input
                    onChange={(e) => changeImage(e.target.files[i], i)}
                    type="file"
                    id={i}
                    className="hidden"
                  />
                  <span
                    onClick={() => removeImage(i)}
                    className="p-2 z-10 cursor-pointer bg-[#f29f67] hover:shadow-lg hover:shadow-slate-400/50 text-white absolute top-1 right-1 rounded-full"
                  >
                    <IoMdCloseCircle />
                  </span>
                </div>
              ))}
              <label
                className="flex justify-center items-center flex-col h-[180px] cursor-pointer border border-dashed border-[#f29f67] hover:border-[#7b7b7b] w-full text-[#1e1e2c]"
                htmlFor="image"
              >
                <span>
                  <FaImage />
                </span>
                <span>Select Image</span>
              </label>
              <input
                className="hidden"
                onChange={imageHandler}
                multiple
                type="file"
                id="image"
              />
            </div>
            <div className="flex">
              <button
                disabled={loader ? true : false}
                type="submit"
                className="bg-[#c28f6d] hover:shadow-slate-300 hover:shadow-md text-white rounded-md px-7 py-2 my-3"
              >
                {loader ? <LoadingSpinner /> : "Add Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
