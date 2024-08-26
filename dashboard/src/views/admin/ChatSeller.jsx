import React, { useState, useEffect, useRef } from "react";
import { IoMdClose } from "react-icons/io";
import { FaList } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  get_admin_message,
  get_sellers,
  send_message_seller_admin,
  updateSellerMessage,
  messageClear,
} from "../../store/Reducers/chatReducer";
import { Link, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { socket } from "../../utilities/utilities";
import { FaFaceGrinBeam } from "react-icons/fa6";
import { current } from "@reduxjs/toolkit";

const ChatSeller = () => {
  const [show, setShow] = useState(false);
  const { sellerId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const [text, setText] = useState("");
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const {
    sellers,
    activeSeller,
    seller_admin_message,
    currentSeller,
    successMessage,
  } = useSelector((state) => state.chat);
  const [receiverMessage, setreceiverMessage] = useState("");

  useEffect(() => {
    dispatch(get_sellers());
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(
        send_message_seller_admin({
          senderId: "",
          receiverId: sellerId,
          message: text,
          senderName: "Admin Support",
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    if (sellerId) {
      dispatch(get_admin_message(sellerId));
    }
  }, [sellerId]);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_admin_to_seller",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage, seller_admin_message]);

  useEffect(() => {
    socket.on("received_seller_message", (msg) => {
      setreceiverMessage(msg);
    });
  }, []);

  useEffect(() => {
    if (receiverMessage) {
      if (
        receiverMessage.senderId === sellerId &&
        receiverMessage.receiverId === ""
      ) {
        dispatch(updateSellerMessage(receiverMessage));
      } else {
        toast.success(receiverMessage.senderName + " " + "Send A message");
        dispatch(messageClear());
      }
    }
  }, [receiverMessage]);

  useEffect(() => {
    if (currentSeller) {
      // console.log("Current Seller Data:", currentSeller); // Log to see the state in the component
    }
  }, [currentSeller]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#e2e2e2] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div
            className={`w-[280px] h-full absolute z-10 ${
              show ? "left-[16px]" : "-left-[360px]"
            } md:left-0 md:relative transition-all rounded-md`}
          >
            <div className="w-full h-[calc(100vh-177px)] bg-[#c28f6d] md:bg-transparent overflow-y-auto">
              <div className="flex text-xl justify-between items-center p-4 md:p-0 md:px-3 md:pb-3 font-semibold text-[#1e1e2c]">
                <h2>Sellers</h2>
                <span
                  className="block cursor-pointer md:hidden"
                  onClick={() => setShow(false)}
                >
                  <IoMdClose />
                </span>
              </div>

              {sellers.map((s, i) => (
                <Link
                  key={i}
                  to={`/admin/dashboard/chat-seller/${s._id}`}
                  className={`bg-[#f29f6731] h-[60px] flex justify-start gap-2 items-center text-[#1e1e2c] px-2 py-2 rounded-md cursor-pointer mb-2 ${
                    sellerId === s._id ? "bg-[#68432b31]" : ""
                  }  `}
                >
                  <div className="relative">
                    <img
                      className="w-[38px] h-[38px] border-white border-2 max-w-[38px] p-[2px] rounded-full"
                      src={s.image}
                      alt=""
                    />

                    {activeSeller.some((a) => a.sellerId === s._id) && (
                      <div className="w-[9px] h-[9px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                    )}
                  </div>

                  <div className="flex justify-center items-start flex-col w-full">
                    <div className="flex justify-between items-center w-full">
                      <h2 className="text-base font-semibold">{s.name}</h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="w-full md:w-[calc(100%-200px)] md:pl-4 ml-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] rounded-full p-[2px]"
                      src={
                        currentSeller?.image ||
                        "http://localhost:3000/images/seller.png"
                      }
                      alt=""
                    />
                    <div className="w-[9px] h-[9px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <span className="text-[#1e1e2c">{currentSeller?.name}</span>
                </div>
              )}
              <div
                onClick={() => setShow(!show)}
                className={`w-[40px] h-[40px] flex md:hidden rounded-2xl bg-[#f29f6747] text-[#1e1e2c] font-medium text-sm hover:bg-[#f29f6782] hover:text-white shadow-lg justify-center items-center cursor-pointer transition-all duration-200 `}
              >
                <span>
                  <FaList />
                </span>
              </div>
            </div>

            <div className="pt-4">
              <div className="bg-white h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto ">
                {sellerId ? (
                  seller_admin_message.map((m, i) => {
                    if (m.senderId === sellerId) {
                      return (
                        <div
                          ref={scrollRef}
                          className="w-full flex justify-start items-center mb-4"
                        >
                          <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full max-w-[38px] p-[3px]"
                                src={
                                  currentSeller?.image ||
                                  "http://localhost:3000/images/seller.png"
                                }
                                alt=""
                              />
                            </div>
                            <div className="flex justify-center items-start flex-col w-auto max-w-[75%] bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md ml-2">
                              <span>{m.message}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div
                          ref={scrollRef}
                          className="w-full flex justify-end items-center mb-4"
                        >
                          <>
                            <div className="flex justify-center items-start flex-col w-auto max-w-[75%] bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md mr-2">
                              <span>{m.message}</span>
                            </div>
                            <div>
                              <img
                                className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full max-w-[38px] p-[3px]"
                                src={
                                  userInfo?.image ||
                                  "http://localhost:3000/images/admin.jpg"
                                }
                                alt=""
                              />
                            </div>
                          </>
                        </div>
                      );
                    }
                  })
                ) : (
                  <div className="w-full h-full flex justify-center items-center flex-col gap-2 text-black">
                    <span>
                      <FaFaceGrinBeam />
                    </span>
                    <span>Select Seller </span>
                  </div>
                )}
                <div ref={scrollRef} />
              </div>
            </div>

            <form className="flex gap-3 mt-4" onSubmit={send}>
              <input
                readOnly={sellerId ? false : true}
                className="w-full px-3 border border-[#1e1e2c] rounded-md outline-none bg-white text-[#1e1e2c] placeholder-black focus:border-[#c28f6d]"
                type="text"
                placeholder="Type message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
                disabled={sellerId ? false : true}
                type="submit"
                className="bg-[#c28f6d] w-[75px] h-[35px] hover:shadow-md text-white rounded-md flex items-center justify-center"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSeller;
