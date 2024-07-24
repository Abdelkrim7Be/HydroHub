import React from "react";
import { FaUsers } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { MdCurrencyExchange, MdProductionQuantityLimits } from "react-icons/md";
import Chart from "react-apexcharts";

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
    },
  };
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
              <h2 className="text-3xl font-semibold">50</h2>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
