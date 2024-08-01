import React from "react";

const OrderDetails = () => {
  return (
    <div className="px-4 lg:px-8 py-6">
      <div className="w-full p-6 bg-gray-100 rounded-md shadow-md">
        <div className="flex justify-between items-center pb-4 border-b border-gray-300">
          <h2 className="text-2xl font-bold text-gray-800">Order Details</h2>
          <select className="px-4 py-2 bg-[#f29f6747] text-gray-800 font-medium text-sm rounded-full shadow focus:outline-none focus:bg-gray-200">
            <option value="Pending">Pending</option>
            <option value="Processing">Processing</option>
            <option value="WareHouse">WareHouse</option>
            <option value="Placed">Placed</option>
            <option value="Canceled">Canceled</option>
          </select>
        </div>
        <div className="pt-4">
          <div className="flex gap-2 text-lg text-gray-800">
            <h2 className="font-medium">#34569</h2>
            <span>28 Jul 2024</span>
          </div>
          <div className="flex flex-wrap mt-4">
            <div className="w-full lg:w-2/5">
              <div className="pr-4 text-gray-800">
                <div className="mb-4">
                  <h2 className="pb-2 font-semibold">Deliver To: WareHouse</h2>
                  <p className="text-sm">
                    P.O. Box 283 8562 Fusce Rd. Frederick Nebraska
                  </p>
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-medium">Payment Status:</h2>
                  <span className="text-base">Paid</span>
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <h2 className="font-medium">Price:</h2>
                  <span className="text-base">$485</span>
                </div>
                {/* Order Products */}
                <div className="bg-[#f29f6747] p-4 rounded-md mb-4">
                  <div className="flex gap-3 items-center">
                    <img
                      className="w-16 h-16 object-cover rounded"
                      src="http://localhost:3000/images/category/1.jpg"
                      alt=""
                    />
                    <div>
                      <h2 className="font-medium">Product Name here:</h2>
                      <p className="text-sm">
                        <span>Brand: HMM</span>
                        <span className="ml-2">Quantity: 3</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f29f6747] p-4 rounded-md mb-4">
                  <div className="flex gap-3 items-center">
                    <img
                      className="w-16 h-16 object-cover rounded"
                      src="http://localhost:3000/images/category/1.jpg"
                      alt=""
                    />
                    <div>
                      <h2 className="font-medium">Product Name here:</h2>
                      <p className="text-sm">
                        <span>Brand: HMM</span>
                        <span className="ml-2">Quantity: 3</span>
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-[#f29f6747] p-4 rounded-md">
                  <div className="flex gap-3 items-center">
                    <img
                      className="w-16 h-16 object-cover rounded"
                      src="http://localhost:3000/images/category/1.jpg"
                      alt=""
                    />
                    <div>
                      <h2 className="font-medium">Product Name here:</h2>
                      <p className="text-sm">
                        <span>Brand: HMM</span>
                        <span className="ml-2">Quantity: 3</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
