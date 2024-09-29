import React, { forwardRef, useEffect, useState } from "react";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import { FixedSizeList as List } from "react-window";
import { useDispatch, useSelector } from "react-redux";
import {
  getSellerPaymentDetails,
  messageClear,
  sendWithdrawalRequest,
  fetchPendingAmounts,
  fetchWithdrawedAmounts,
} from "../../store/Reducers/paymentReducer";
import toast from "react-hot-toast";
import moment from "moment";

function handleOnWheel({ deltaY }) {
  console.log("handleOnWheel", deltaY);
}

const outerElementType = forwardRef((props, ref) => (
  <div ref={ref} onWheel={handleOnWheel} {...props} />
));

const Payments = () => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const {
    successMessage,
    errorMessage,
    loader,
    pendingWithdraws,
    successfulWithdraws,
    totalAmount,
    withdrawAmount,
    pendingAmount,
    availableAmount,
  } = useSelector((state) => state.payment);
  const sortedPendingWithdraws = [...pendingWithdraws].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
  const sortedSuccessfulWithdraws = [...successfulWithdraws].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  const [amount, setAmount] = useState(0);

  const sendRequest = async (e) => {
    e.preventDefault();
    if (availableAmount - amount > 10) {
      await dispatch(sendWithdrawalRequest({ amount, sellerId: userInfo._id }));
      setAmount(0);
      dispatch(getSellerPaymentDetails(userInfo._id));
      dispatch(fetchPendingAmounts(userInfo._id));
      dispatch(fetchWithdrawedAmounts(userInfo._id));
      dispatch(fetchPendingAmounts(userInfo._id));
      dispatch(fetchWithdrawedAmounts(userInfo._id));
    } else {
      toast.error("Insufficient Balance");
    }
  };
  const Row = ({ index, style, listType }) => {
    const withdraw =
      listType === "pending"
        ? pendingWithdraws[index]
        : successfulWithdraws[index];

    return (
      <div style={style} className="flex text-sm font-medium">
        <div className="w-[25%] p-2 whitespace-nowrap">{index + 1}</div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          ${withdraw?.amount || "N/A"}
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          <span className="py-[1px] px-[5px] bg-[#f29f6731] text-[#1e1e2c] rounded-md text-sm">
            {withdraw?.status || "N/A"}
          </span>
        </div>
        <div className="w-[25%] p-2 whitespace-nowrap">
          {moment(withdraw?.createdAt).format("LL") || "N/A"}
        </div>
      </div>
    );
  };

  useEffect(() => {
    dispatch(getSellerPaymentDetails(userInfo._id));
    dispatch(fetchPendingAmounts(userInfo._id));
    dispatch(fetchWithdrawedAmounts(userInfo._id));
  }, []);

  useEffect(() => {
    if (successMessage) {
      toast.success(successMessage);
      dispatch(messageClear());
    }
    if (errorMessage) {
      toast.error(errorMessage);
      dispatch(messageClear());
    }
  }, [successMessage, errorMessage]);

  useEffect(() => {
    console.log(pendingWithdraws);
  }, [pendingWithdraws]);

  useEffect(() => {
    if (pendingWithdraws.length > 0) {
      console.log(pendingWithdraws[0]);
    }
  }, [pendingWithdraws]);
  useEffect(() => {
    console.log(successfulWithdraws);
  }, [successfulWithdraws]);

  useEffect(() => {
    if (successfulWithdraws.length > 0) {
      console.log(successfulWithdraws[0]);
    }
  }, [successfulWithdraws]);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchPendingAmounts(userInfo._id));
      dispatch(fetchWithdrawedAmounts(userInfo._id));
    }
  }, [dispatch, userInfo._id]);

  return (
    <div className="px-2 md:px-7 py-5">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7 mb-5">
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">${totalAmount}</h2>
            <span className="text-md font-light">Total Sales</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">${availableAmount}</h2>
            <span className="text-md font-light">Available Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">${withdrawAmount}</h2>
            <span className="text-md font-light">Withdrawal Amount</span>
          </div>
          <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
            <MdCurrencyExchange className="shadow-lg" />
          </div>
        </div>
        <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
          <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
            <h2 className="text-3xl font-semibold">${pendingAmount}</h2>
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
            <form onSubmit={sendRequest}>
              <div className="flex flex-col sm:flex-row gap-3 items-center">
                <input
                  onChange={(e) => setAmount(e.target.value)}
                  value={amount}
                  min="0"
                  type="number"
                  className="px-3 py-2 w-full sm:w-auto flex-grow outline-none placeholder-black bg-white border border-gray-300 rounded-lg"
                  name="amount"
                />
                <button
                  disabled={loader}
                  className="bg-[#c28f6d] hover:shadow-slate-300 hover:shadow-md text-white rounded-md px-7 py-2"
                >
                  {loader ? "loading..." : "Submit"}
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
                itemCount={successfulWithdraws.length}
                itemSize={35}
                outerElementType={outerElementType}
              >
                {({ index, style }) => (
                  <Row
                    index={index}
                    style={style}
                    listType="success"
                    withdraw={sortedSuccessfulWithdraws[index]}
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

export default Payments;
