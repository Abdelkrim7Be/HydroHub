import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  get_seller_message,
  send_message_seller_admin,
  updateAdminMessage,
  messageClear,
} from "../../store/Reducers/chatReducer";
import { socket } from "../../utilities/utilities";

const SupportChat = () => {
  const scrollRef = useRef();
  const dispatch = useDispatch();
  const [text, setText] = useState("");
  const { seller_admin_message, successMessage } = useSelector(
    (state) => state.chat
  );
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(get_seller_message());
  }, []);

  const send = (e) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(
        send_message_seller_admin({
          senderId: userInfo._id,
          receiverId: "",
          message: text.trim(),
          senderName: userInfo.name,
        })
      );
      setText("");
    }
  };

  useEffect(() => {
    socket.on("received_admin_message", (msg) => {
      dispatch(updateAdminMessage(msg));
    });
  }, []);

  useEffect(() => {
    if (successMessage) {
      socket.emit(
        "send_message_seller_to_admin",
        seller_admin_message[seller_admin_message.length - 1]
      );
      dispatch(messageClear());
    }
  }, [successMessage, seller_admin_message]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [seller_admin_message]);

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#e2e2e2] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full md:px-4 ml-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    className="w-[45px] h-[45px] border-green-500 border-2 rounded-full p-[2px]"
                    src="http://localhost:3000/images/admin.jpg"
                    alt="Admin"
                  />
                  <div className="w-[9px] h-[9px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                </div>
                <h2 className="text-base text-[#1e1e2c] font-semibold">
                  Support
                </h2>
              </div>
            </div>
            <div className="pt-4">
              <div className="bg-white h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                {seller_admin_message.map((msg, index) => (
                  <div
                    key={index}
                    ref={scrollRef}
                    className={`w-full flex ${
                      msg.senderId === userInfo._id
                        ? "justify-end"
                        : "justify-start"
                    } items-center`}
                  >
                    <div
                      className={`flex items-start gap-2 py-2 max-w-full lg:max-w-[85%]`}
                    >
                      {msg.senderId !== userInfo._id ? (
                        <>
                          <img
                            className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full p-[3px]"
                            src={
                              msg.senderId === ""
                                ? "http://localhost:3000/images/admin.png"
                                : userInfo.image ||
                                  "http://localhost:3000/images/seller.png"
                            }
                            alt="Sender"
                          />
                          <div
                            className={`bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md`}
                          >
                            <span>{msg.message}</span>
                          </div>
                        </>
                      ) : (
                        <>
                          <div
                            className={`bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md`}
                          >
                            <span>{msg.message}</span>
                          </div>
                          <img
                            className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full p-[3px]"
                            src={
                              userInfo.image ||
                              "http://localhost:3000/images/seller.png"
                            }
                            alt="Seller"
                          />
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <form onSubmit={send} className="flex gap-3 mt-4">
              <input
                className="w-full px-3 border border-[#1e1e2c] rounded-md outline-none bg-white text-[#1e1e2c] placeholder-black focus:border-[#c28f6d]"
                type="text"
                placeholder="Type message..."
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <button
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

export default SupportChat;
