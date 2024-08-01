import React, { forwardRef } from "react";
import { MdCurrencyExchange } from "react-icons/md";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium">
        <div className="w-[25%] p-2 whitespace-nowrap">{++index}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">$7548</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#f29f6731] text-[#1e1e2c] rounded-md text-sm">
            Pending
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">27 July 2024</div>
      </div>
    );
  };
  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">$7548</h2>
            <span className="text-md font-light">Total Sales</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">$150</h2>
            <span className="text-md font-light">Available Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">$100</h2>
            <span className="text-md font-light">WithDrawal Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">0</h2>
            <span className="text-md font-light">Pending Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
      </div>
      <div className="py-5 w-full grid grid-cols-1 md:grid-cols-2 gap-2 pb-4">
        <div className="bg-[#e2e2e2] text-[#1e1e2c] rounded-md p-5">
          <h2 className="text-lg font-semibold">Send Request</h2>
          <div className="pt-5 mb-5">
            <form>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  min="0"
                  type="number"
                  className="px-3 py-2 w-full sm:w-auto flex-grow outline-none placeholder-black bg-white border border-gray-300 rounded-lg"
                  name="amount"
                />
                <button className="bg-[#c28f6d] hover:shadow-slate-300 hover:shadow-md text-white rounded-md px-7 py-2">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="text-lg pb-4 font-semibold">Pending Request</div>
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#f29f6731] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2 ">No</div>
              <div className="w-[25%] p-2 ">Amount</div>
              <div className="w-[25%] p-2 ">Status</div>
              <div className="w-[25%] p-2 ">Date</div>
            </div>
            {
              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={350}
                itemCount={10}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            }
          </div>
        </div>
        <div className="bg-[#e2e2e2] text-[#1e1e2c] rounded-md p-5">
          <h2 className="text-lg pb-5 font-semibold">Successful Withdrawal</h2>
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#f29f6731] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[25%] p-2 ">No</div>
              <div className="w-[25%] p-2 ">Amount</div>
              <div className="w-[25%] p-2 ">Status</div>
              <div className="w-[25%] p-2 ">Date</div>
            </div>
            {
              <List
                style={{ minWidth: "340px" }}
                className="List"
                height={350}
                itemCount={10}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {Row}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
