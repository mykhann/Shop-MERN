import React from "react";
import { Link } from "react-router-dom";

const DashBoardSideBar = () => {
  return (
    <div className="flex-none w-64 bg-gray-800 p-6 h-screen">
      <Link to="/dashboard">
      <h2 className="text-2xl font-bold text-white mb-8">Admin Dashboard</h2>
      </Link>
      <nav className="overflow-y-auto">
        <ul className="space-y-4">
          <li>
            <Link
              to="/admin/add-product"
              className="text-lg text-gray-300 border-rose-600 hover:text-white hover:bg-cyan-950 transition duration-200 flex items-center"
            >
              Add Product
            </Link>
          </li>
          <li>
            <Link
              to="/admin/update-product"
              className="text-lg text-gray-300 hover:text-white transition hover:bg-cyan-950 duration-200 flex items-center"
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/admin/orders"
              className="text-lg text-gray-300 hover:text-white  hover:bg-cyan-950 transition duration-200 flex items-center"
            >
              Orders
            </Link>
          </li>
          <li>
            {/* <Link
              to="/admin/orders/get"
              className="text-lg text-gray-300 hover:text-white hover:bg-cyan-950 transition duration-200 flex items-center"
            >Search Order</Link> */}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default DashBoardSideBar;
