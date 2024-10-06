import React, { forwardRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FixedSizeList as List } from "react-window";
import {
  confirmPaymentRequest as confirmPaymentAction, // Renamed import
  getPaymentRequest,
  messageClear,
} from "../../store/Reducers/paymentReducer";
import moment from "moment";
import toast from "react-hot-toast";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const PaymentRequest = () => {
  const dispatch = useDispatch();
  const { successMessage, errorMessage, pendingWithdraws, loader } =
    useSelector((state) => state.payment);
  const [paymentId, setPaymentId] = useState("");

  const sortedPendingWithdraws = [...pendingWithdraws].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  useEffect(() => {
    dispatch(getPaymentRequest());
  }, [dispatch]);

  const handleConfirmPayment = (id) => {
    setPaymentId(id);
    dispatch(confirmPaymentAction(id))
      .unwrap()
      .catch((err) => console.error("Payment confirmation error:", err));
  };

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage, dispatch]);

  const Row = ({ index, style, withdraw }) => {
    return (
      <div style={style} className="flex text-sm font-medium">
        <div className="w-[20%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[20%] p-2 whitespace-nowrap">
          ${withdraw?.amount || "N/A"}
        </div>
        <div className="w-[20%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#f29f6731] text-[#1e1e2c] rounded-md text-sm">
            {withdraw?.status || "N/A"}
          </span>
        </div>
        <div className="w-[20%] p-2 whitespace-nowrap">
          {moment(withdraw?.createdAt).format("LL") || "N/A"}
        </div>
        <div className="w-[20%] p-2 whitespace-nowrap">
          <button
            disabled={loader}
            onClick={() => handleConfirmPayment(withdraw?._id)} // Use renamed local function
            className="bg-[#c28f6d] hover:bg-[#b57858] text-white rounded px-3 py-0"
          >
            {loader && paymentId === withdraw?._id ? "loading..." : "Confirm"}
          </button>
        </div>
      </div>
    );
  };

  useEffect(() => {
    console.log("Pending Withdraws:", pendingWithdraws);
  }, [pendingWithdraws]);

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
                itemCount={pendingWithdraws.length}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {({ index, style }) => (
                  <Row
                    index={index}
                    style={style}
                    listType="pending"
                    withdraw={sortedPendingWithdraws[index]}
                  />
                )}
              </List>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentRequest;
