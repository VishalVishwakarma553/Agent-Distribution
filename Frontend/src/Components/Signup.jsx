import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import axioInstance from "../lib/axiosInstance";
import { AppStore } from "../Store/AppStore";

const Signup = () => {
  const [formData, setFormData] = useState({
    Name: "",
    Email: "",
    Password: "",
  });
  const {setUser} = useContext(AppStore)
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(!formData.Name || !formData.Email || !formData.Password){
      toast.error("All fields are required", {
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
      return
    }
    try {
      const res = await axioInstance.post("/user/signup", formData);
      if (res?.data?.success) {
        localStorage.setItem("User", JSON.stringify(res.data.user))
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
  const onChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex justify-center items-center h-screen w-full p-2 md:p-0 ">
      <div className="w-full max-w-lg p-4 rounded-md border border-gray-400 shadow-lg shadow-gray-300 flex-flex-col gap-3 bg-gray-100">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-center">SignUp</h1>
          <div>
            <h3 className="text-xl font-semibold text-center">
              Create New Account
            </h3>
            <p className="text-lg font-medium text-center">
              Please enter following details to signup
            </p>
          </div>
        </div>
        <form onSubmit={onSubmitHandler} className="flex flex-col gap-3">
          <label
            htmlFor="Name"
            className="flex flex-col gap-2 text-lg font-semibold"
          >
            Name
            <input
              type="text"
              id="Name"
              name="Name"
              onChange={onChangeHandler}
              className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800"
            />
          </label>
          <label
            htmlFor="email"
            className="flex flex-col gap-2 text-lg font-semibold"
          >
            Email
            <input
              type="email"
              id="email"
              name="Email"
              onChange={onChangeHandler}
              className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800"
            />
          </label>
          <label
            htmlFor="password"
            className="flex flex-col gap-2 text-lg font-semibold"
          >
            Password
            <input
              type="password"
              id="password"
              name="Password"
              onChange={onChangeHandler}
              className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800"
            />
          </label>
          <button className="w-full text-center text-xl text-gray-950 font-bold p-3 bg-green-500 rounded-lg hover:bg-green-700 duration-150 cursor-pointer">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
