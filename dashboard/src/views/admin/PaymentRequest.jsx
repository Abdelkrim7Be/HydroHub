import React, { forwardRef } from "react";
import { FixedSizeList as List } from "react-window";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const array = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const Row = ({ index, style }) => {
    return (
      <div style={style} className="flex text-sm font-medium">
        <div className="w-[20%] p-2 whitespace-nowrap">{++index}</div>
        <div className="w-[20%] p-2 whitespace-nowrap">$7548</div>
        <div className="w-[20%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#f29f6731] text-[#1e1e2c] rounded-md text-sm">
            Pending
          </span>
        </div>
        <div className="w-[20%] p-2 whitespace-nowrap">27 July 2024</div>
        <div className="w-[20%] p-2 whitespace-nowrap">
          <button className="bg-[#c28f6d] shadow-lg hover:shadow-slate-300 px-3 py-[2px] cursor-pointer text-white rounded-sm text-sm">
            Confirm
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="px-2 lg:px-7 pt-5">
      <div className="w-full p-4 bg-[#e2e2e2] rounded-md">
        <h2 className="text-xl font-medium pb-5 text-[#1e1e2c]">
          Withdrawal Requests
        </h2>
        <div className="w-full">
          <div className="w-full overflow-x-auto">
            <div className="flex bg-[#f29f6731] uppercase text-xs font-bold min-w-[340px] rounded-md">
              <div className="w-[20%] p-2 ">No</div>
              <div className="w-[20%] p-2 ">Amount</div>
              <div className="w-[20%] p-2 ">Status</div>
              <div className="w-[20%] p-2 ">Date</div>
              <div className="w-[20%] p-2 ">Action</div>
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

export default PaymentRequest;
