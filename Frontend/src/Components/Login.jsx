import React, { useContext } from "react";
import { useState } from "react";
import axioInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { AppStore } from "../Store/AppStore";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [formContent, setFormContent] = useState({
    Email: "",
    Password: "",
  });
  const {user,setUser} = useContext(AppStore)
  const navigate = useNavigate()
  const onchangeHandler = (e) => {
    setFormContent({ ...formContent, [e.target.name]: e.target.value });
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axioInstance.post("/user/login", formContent);
      if (res?.data?.success) {
        localStorage.setItem("User", JSON.stringify(res.data.user));
        setUser(res.data.user)
        navigate("/")
        toast.success(res?.data?.message, {
          style: {
            border: "1px solid #713200",
            padding: "16px",
            color: "#713200",
          },
          iconTheme: {
            primary: "#713200",
            secondary: "#FFFAEE",
          },
        });
      }
    } catch (error) {
      toast.error(error.res.data, {
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  };
  return (
    <div className="flex justify-center items-center h-screen w-full p-2 md:p-0">
      <div className="w-full max-w-lg p-4 rounded-md border border-gray-400 shadow-lg shadow-gray-300 flex-flex-col gap-3 bg-gray-100">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-center">Login</h1>
          <div>
            <h3 className="text-xl font-semibold text-center">Welcome Back</h3>
            <p className="text-lg font-medium text-center">
              Please enter following details to Login
            </p>
          </div>
        </div>
          <form onSubmit={onHandleSubmit} className="flex flex-col gap-3">
            <label
              htmlFor="email"
              className="flex flex-col gap-2 text-lg font-semibold"
            >
              Email
              <input
                type="email"
                id="email"
                name="Email"
                onChange={onchangeHandler}
                className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800"
              />
            </label>
            <label
              htmlFor="email"
              className="flex flex-col gap-2 text-lg font-semibold"
            >
              Password
              <input
                type="password"
                id="email"
                name="Password"
                onChange={onchangeHandler}
                className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800"
              />
            </label>
            <p className="text-gray-600">Don't have an account  <Link to="/signup" className="text-blue-500 underline">Sign up</Link></p>
            <button className="w-full text-center text-xl text-gray-950 font-bold p-3 bg-green-500 rounded-lg hover:bg-green-700 duration-150 cursor-pointer">
              Submit
            </button>
          </form>
      </div>
    </div>
  );
};

export default Login;
