import React, { useEffect, useState } from "react";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import Chart from "react-apexcharts";
import { Link } from "react-router-dom";
import { get_latest_messages } from "../../store/Reducers/chatReducer";
import { getProducts } from "../../store/Reducers/productReducer"; // Update the path if necessary
import { useDispatch, useSelector } from "react-redux";

const AdminDashboard = () => {
  const state = {
    series: [
      {
        name: "Orders",
        data: [23, 34, 75, 85, 92, 49, 83, 69, 72, 30, 62, 89],
      },
      {
        name: "Revenue",
        data: [41, 85, 73, 69, 12, 58, 76, 89, 45, 23, 99, 78],
      },
      {
        name: "Sellers",
        data: [10, 12, 15, 14, 13, 9, 16, 19, 23, 25, 24, 21],
      },
    ],
    options: {
      colors: ["#E0B50F", "#1e1e2c", "#34b1aa"],
      chart: {
        type: "bar",
        background: "transparent",
        foreColor: "#1e1e2c",
      },
      plotOptions: {
        bar: {
          borderRadius: 4,
          horizontal: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        curve: "smooth",
        colors: "#1e1e2c",
        width: 2.5,
        dashArray: 0,
      },
      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      legend: {
        position: "top",
      },
      grid: {
        borderColor: "#c2c2c2",
        strokeDashArray: 0,
      },
      responsive: [
        {
          breakpoint: 565,
          yaxis: {
            categories: [
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          options: {
            plotOptions: {
              bar: {
                horizontal: true,
              },
            },
            chart: {
              height: "550px",
            },
          },
        },
      ],
    },
  };
  const dispatch = useDispatch();
  const { latestMessages } = useSelector((state) => state.chat);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    dispatch(get_latest_messages());
  }, []);
  const getDaysAgo = (dateString) => {
    const messageDate = new Date(dateString);
    const today = new Date();
    const diffTime = today - messageDate;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatDate = (dateString) => {
    const daysAgo = getDaysAgo(dateString);
    if (daysAgo === 0) {
      return "today";
    }
    return `${daysAgo} day${daysAgo > 1 ? "s" : ""} ago`;
  };

  // useEffect(() => {
  //   dispatch(getProducts()).then((products) => {
  //     setProductCount(products.length);
  //   });
  // }, [dispatch]);

  return (
    <div>
      <div className="px-2 md:px-7 py-5">
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-7">
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
              <h2 className="text-3xl font-semibold">380</h2>
              <span className="text-md font-light">Products</span>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
              <MdProductionQuantityLimits className="shadow-lg" />
            </div>
          </div>
          <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
            <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
              <h2 className="text-3xl font-semibold">10</h2>
              <span className="text-md font-light">Sellers</span>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
              <FaUsers className="shadow-lg" />
            </div>
          </div>
          <div className="flex justify-between items-center p-5 bg-[#e2e2e2] rounded-md gap-3">
            <div className="flex flex-col justify-start items-start text-[#1e1e2c]">
              <h2 className="text-3xl font-semibold">82</h2>
              <span className="text-md font-light">Orders</span>
            </div>
            <div className="w-[40px] h-[40px] rounded-full bg-[#f29f6782] flex justify-center items-center text-xl">
              <FaCartShopping className="shadow-lg" />
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-7 py-5 w-full flex flex-wrap mt-7">
        <div className="w-full lg:w-7/12 lg:pr-3">
          <div className="w-full bg-[#e2e2e2] p-4 rounded-md">
            <Chart
              options={state.options}
              series={state.series}
              type="bar"
              height={350}
            />
          </div>
        </div>
        <div className="w-full lg:w-5/12 lg:pl-4 mt-6 lg:mt-0">
          <div className="w-full bg-[#e2e2e2] p-4 rounded-md text-[#1e1e2c]">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg text-[#1e1e2c] pb-3">
                Recent Messages
              </h2>
              <Link
                to={"http://localhost:3000/admin/dashboard/chat-seller"}
                className="font-semibold text-sm text-[#393939]"
              >
                View all
              </Link>
            </div>
            <div className="flex flex-col gap-2 pt-6 text-[#1e1e2c]">
              <ol className="relative border-l border-[#1e1e2c] ml-4">
                {latestMessages.map((message, index) => (
                  <li key={index} className="mb-3 ml-6">
                    <div className="w-10 h-10 flex absolute -left-5 shadow-lg justify-center items-center p-[6px] bg-[#f29f6782] rounded-full z-10">
                      <img
                        className="w-full rounded-full h-full shadow-lg"
                        src="http://localhost:3000/images/admin.jpg" // Update this dynamically if needed
                        alt="admin"
                      />
                    </div>
                    <div className="p-3 bg-[#bbbbbb] rounded-lg shadow-sm">
                      <div className="flex justify-between items-center mb-2">
                        <a href="#" className="text-md font-normal">
                          {message.senderName === "Admin Support"
                            ? "Me"
                            : message.senderName}
                        </a>
                        <time className="mb-1 text-sm font-normal sm:order-last sm:md-0">
                          {formatDate(message.createdAt)}
                        </time>
                      </div>
                      <div className="p-2 text-xs font-normal bg-[#f4b48a61] rounded-lg border border-[#1e1e2c]">
                        {message.message}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="px-2 md:px-7 py-5 w-full flex flex-wrap mt-7">
        <div className="w-full bg-[#e2e2e2] p-4 rounded-md">
          <div className="flex justify-between items-center">
            <h2 className="font-semibold text-lg text-[#1e1e2c] pb-3">
              Recent Orders
            </h2>
            <Link className="font-semibold text-sm text-[#1e1e2c]">
              View All
            </Link>
          </div>
          <div className="relative overflow-x-auto">
            <table className="w-full text-left text-[#1e1e2c] font-medium text-sm bg-[#f29f6731] rounded-lg">
              <thead className="text-sm uppercase border-b border-[#7f7f7f] ">
                <tr>
                  <th scope="col" className="py-3 px-4">
                    Order Id
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Price
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Payment Status
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Order Status
                  </th>
                  <th scope="col" className="py-3 px-4">
                    Active
                  </th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5].map((elt, i) => (
                  <tr key={i}>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      #34527
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      $343
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      Pending
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      Pending
                    </td>
                    <td
                      scope="row"
                      className="py-3 px-4 font-medium whitespace-nowrap"
                    >
                      <Link>View</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
