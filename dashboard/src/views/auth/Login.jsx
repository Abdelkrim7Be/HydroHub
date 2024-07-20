import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const inputHandler = (e) => {
    setState({
      ...state,
      [e.target.name]: [e.target.value],
    });
  };

  const submit = (e) => {
    e.preventDefault();
    console.log(state);
  };
  return (
    <div className="font-[sans-serif] bg-gray-50 flex items-center md:h-screen p-4 flex-col">
      <div>
        <img src="/HMM.png" className="w-32 mx-auto" alt="Logo" />
      </div>
      <div className="w-full max-w-4xl max-md:max-w-xl mx-auto">
        <div className="bg-white grid md:grid-cols-2 gap-16 w-full sm:p-8 p-6 shadow-md rounded-md overflow-hidden">
          <div className="max-md:order-1 space-y-6">
            <div className="md:mb-16 mb-8">
              <h3 className="text-gray-800 text-2xl font-bold">Welcome Back</h3>
            </div>
            <div className="space-y-6">
              <button
                type="button"
                className="w-full px-5 py-2.5 flex items-center justify-center rounded-md text-white text-base tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 167.657 167.657"
                >
                  <path
                    d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                    data-original="#010002"
                  />
                </svg>
                Continue with Facebook
              </button>
              <button
                type="button"
                className="w-full px-5 py-2.5 flex items-center justify-center rounded-md text-gray-800 text-base tracking-wider font-semibold border-none outline-none bg-gray-100 hover:bg-gray-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22px"
                  fill="#fff"
                  className="inline shrink-0 mr-4"
                  viewBox="0 0 512 512"
                >
                  <path
                    fill="#fbbd00"
                    d="M120 256c0-25.367 6.989-49.13 19.131-69.477v-86.308H52.823C18.568 144.703 0 198.922 0 256s18.568 111.297 52.823 155.785h86.308v-86.308C126.989 305.13 120 281.367 120 256z"
                    data-original="#fbbd00"
                  />
                  <path
                    fill="#0f9d58"
                    d="m256 392-60 60 60 60c57.079 0 111.297-18.568 155.785-52.823v-86.216h-86.216C305.044 385.147 281.181 392 256 392z"
                    data-original="#0f9d58"
                  />
                  <path
                    fill="#31aa52"
                    d="m139.131 325.477-86.308 86.308a260.085 260.085 0 0 0 22.158 25.235C123.333 485.371 187.62 512 256 512V392c-49.624 0-93.117-26.72-116.869-66.523z"
                    data-original="#31aa52"
                  />
                  <path
                    fill="#3c79e6"
                    d="M512 256a258.24 258.24 0 0 0-4.192-46.377l-2.251-12.299H256v120h121.452a135.385 135.385 0 0 1-51.884 55.638l86.216 86.216a260.085 260.085 0 0 0 25.235-22.158C485.371 388.667 512 324.38 512 256z"
                    data-original="#3c79e6"
                  />
                  <path
                    fill="#cf2d48"
                    d="m352.167 159.833 10.606 10.606 84.853-84.852-10.606-10.606C388.668 26.629 324.381 0 256 0l-60 60 60 60c36.326 0 70.479 14.146 96.167 39.833z"
                    data-original="#cf2d48"
                  />
                  <path
                    fill="#eb4132"
                    d="M256 120V0C187.62 0 123.333 26.629 74.98 74.98a259.849 259.849 0 0 0-22.158 25.235l86.308 86.308C162.883 146.72 206.376 120 256 120z"
                    data-original="#eb4132"
                  />
                </svg>
                Continue with Google
              </button>
            </div>
          </div>

          <form className="w-full" onSubmit={submit}>
            <div className="mb-8">
              <h3 className="text-gray-800 text-2xl font-bold">Login</h3>
            </div>
            <div className="space-y-6">
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={inputHandler}
                    value={state.email}
                    name="email"
                    type="email"
                    required
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter email"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 512 512"
                  >
                    <path
                      d="M339.392 258.624 512 367.872V144.128L339.392 258.624z"
                      data-original="#000000"
                    />
                    <path
                      d="m0 144.128 172.608 114.496L0 367.872V144.128zM480 80H32c-17.664 0-32 14.336-32 32v288c0 17.664 14.336 32 32 32h448c17.664 0 32-14.336 32-32V112c0-17.664-14.336-32-32-32zm-16.064 32-207.808 137.984L48.064 112h415.872zM32 400V389.856l157.824-102.72 25.6 17.024a56.038 56.038 0 0 0 62.528 0l25.6-17.024L480 389.856V400H32z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <label className="text-gray-800 text-sm mb-2 block">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={inputHandler}
                    value={state.password}
                    name="password"
                    type="password"
                    required
                    className="bg-white border border-gray-300 w-full text-sm text-gray-800 pl-4 pr-10 py-2.5 rounded-md outline-blue-500"
                    placeholder="Enter password"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    className="w-4 h-4 absolute right-4"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="M15.5 11H15v-1.75C15 7.232 12.988 5 10.5 5S6 7.232 6 9.25V11h-.5a.5.5 0 0 0-.5.5v10c0 .275.225.5.5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5zm-6-1.75C9.5 8.232 9.933 7 10.5 7s1 .232 1 1.25V11h-2V9.25zM13 13c.552 0 1 .447 1 1s-.448 1-1 1-1-.447-1-1 .448-1 1-1zm-3 5c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1zm-1-4c.552 0 1 .447 1 1s-.448 1-1 1-1-.447-1-1 .448-1 1-1zm4 4c-.552 0-1-.447-1-1s.448-1 1-1 1 .447 1 1-.448 1-1 1z"
                      data-original="#000000"
                    />
                  </svg>
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 text-white font-semibold tracking-wider bg-blue-600 rounded-md hover:bg-blue-700"
                >
                  Login
                </button>
              </div>
              <div>
                <p className="text-sm text-gray-800">
                  Don't have an account?{" "}
                  <Link
                    to="/register"
                    className="text-blue-600 hover:underline"
                  >
                    Register
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
