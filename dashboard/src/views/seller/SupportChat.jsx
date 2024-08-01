import React, { useState } from "react";

const SupportChat = () => {
  const sellerId = 65;

  return (
    <div className="px-2 lg:px-7 py-5">
      <div className="w-full bg-[#e2e2e2] px-4 py-4 rounded-md h-[calc(100vh-140px)]">
        <div className="flex w-full h-full relative">
          <div className="w-full md:px-4  ml-4">
            <div className="flex justify-between items-center">
              {sellerId && (
                <div className="flex justify-start items-center gap-3">
                  <div className="relative">
                    <img
                      className="w-[45px] h-[45px] border-green-500 border-2 max-w-[45px] rounded-full p-[2px]"
                      src="http://localhost:3000/images/admin.jpg"
                      alt=""
                    />
                    <div className="w-[9px] h-[9px] bg-green-500 rounded-full absolute right-0 bottom-0"></div>
                  </div>
                  <h2 className="text-base text-[#1e1e2c] font-semibold">
                    Support
                  </h2>
                </div>
              )}
            </div>
            <div className="pt-4">
              <div className="bg-white h-[calc(100vh-290px)] rounded-md p-3 overflow-y-auto">
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full max-w-[38px] p-[3px]"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md">
                      <span>How are you Sir?</span>
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-end items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div className="flex justify-center items-start flex-col w-full bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md">
                      <span>I'm fine, wbu?</span>
                    </div>
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full max-w-[38px] p-[3px]"
                        src="http://localhost:3000/images/seller.png"
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full flex justify-start items-center">
                  <div className="flex justify-start items-start gap-2 md:px-3 py-2 max-w-full lg:max-w-[85%]">
                    <div>
                      <img
                        className="w-[38px] h-[38px] border-2 border-[#f29f67] rounded-full max-w-[38px] p-[3px]"
                        src="http://localhost:3000/images/admin.jpg"
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-start flex-col w-full bg-[#f29f6747] shadow-lg shadow-slate-300 text-[#1e1e2c] py-1 px-2 rounded-md">
                      <span>All good, What's the concern ?</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <form className="flex gap-3 mt-4">
              <input
                className="w-full px-3 border border-[#1e1e2c] rounded-md outline-none bg-white text-[#1e1e2c] placeholder-black focus:border-[#c28f6d]"
                type="text"
                placeholder="Type message..."
              />
              <button className="bg-[#c28f6d] w-[75px] h-[35px] hover:shadow-md text-white rounded-md flex items-center justify-center">
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
