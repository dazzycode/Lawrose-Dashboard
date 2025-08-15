
// src/AllRoutes.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import Product from "../pages/Product";
import Order from "../pages/Order";
import Edit from "../pages/Edit";
import Customer from "../pages/Customer";
import Rating from "../pages/Rating";
import Discount from "../pages/Discount";
import EditCode from "../pages/EditCode";




const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard/>} />
               <Route path="/products" element={<Product/>} />
                   <Route path="/orders" element={<Order/>} />
                   <Route path="/edit" element={<Edit/>} />
                   <Route path="/customers" element={<Customer/>} />
                   <Route path="/ratings" element={<Rating/>} />
                   <Route path="/discounts" element={<Discount/>} />
                   <Route path="/create" element={<EditCode/>} />

    </Routes>
  );
};

export default AllRoutes;
