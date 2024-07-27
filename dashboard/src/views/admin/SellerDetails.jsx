import React from "react";

const SellerDetails = () => {
  return (
    <div className="px-2 lg:px-7 pt-5">
      <h1 className="text-[20px] font-bold mb-3">Seller Details</h1>
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <div className="w-full flex flex-wrap text-[#1e1e2c]">
          <div className="w-3/12 flex justify-center items-center py-3">
            <div>
              <img
                className="w-full h-[230px] rounded-full"
                src="http://localhost:3000/images/seller.png"
                alt=""
              />
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Basic Info</h2>
              </div>

              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#f29f6731] rounded-lg">
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Name: </span>
                  <span>Soufiane Omari</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Email: </span>
                  <span>Soufianeomari@gmail.com</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Role: </span>
                  <span>Seller</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Status: </span>
                  <span>Active</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Payment Status: </span>
                  <span>Active</span>
                </div>
              </div>
            </div>
          </div>
          <div className="w-4/12">
            <div className="px-0 md:px-5 py-2">
              <div className="py-2 text-lg">
                <h2>Address</h2>
              </div>

              <div className="flex justify-between text-sm flex-col gap-2 p-4 bg-[#f29f6731] rounded-lg">
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Shop Name: </span>
                  <span>HMM</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Division: </span>
                  <span>Meknes</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>District: </span>
                  <span>Hamria</span>
                </div>
                <div className="flex gap-2 text-[#1e1e2c] font-bold">
                  <span>Region: </span>
                  <span>Fez-meknes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <form>
            <div className="flex gap-4 py-3">
              <select className="px-4 py-2  outline-none border bg-[#f29f6731] text-[#1e1e2c] font-medium text-sm focus:bg-[#e2e2e2] hover:text-[#1e1e2c] rounded-full shadow-lg focus:border-stone-300 overflow-hidden">
                <option value="">--Select Status--</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
              <button className="bg-[#c28f6d] w-[170px] hover:shadow-slate-300 hover:shadow-md text-white rounded-md px-7 py-2">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SellerDetails;
