import React, { useState } from "react";
import toast from "react-hot-toast";
import axioInstance from "../lib/axiosInstance";
import { useContext } from "react";
import { AppStore } from "../Store/AppStore";
import { useNavigate } from "react-router-dom";
import { Loader } from "lucide-react";
const AddAgent = () => {
  const { user } = useContext(AppStore);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [agentDetail, setAgentDetail] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Password: "",
    CreatedBy: user._id,
  });
  const validateMobileNumber = (number) => {
    const regex = /^\d{10}$/; // Only digits, exactly 10
    return regex.test(number);
  };
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    if (
      !agentDetail.Name ||
      !agentDetail.Email ||
      !agentDetail.Mobile ||
      !agentDetail.Password
    ) {
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
      return;
    }
    if (!validateMobileNumber(agentDetail.Mobile)) {
      toast.error("Mobile number is not valid", {
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
      return;
    }
    try {
      setLoading(true);
      const res = await axioInstance.post("/agent/addAgent", agentDetail);
      console.log(res);
      if (res?.data?.success) {
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
      navigate("/");
    } catch (error) {
      toast.error(error?.res?.data, {
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
    } finally {
      setLoading(false);
    }
  };
  const onchangeHandler = (e) => {
    setAgentDetail({ ...agentDetail, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex mt-4 w-full px-4 md:px-0">
      <div className="w-full max-w-lg mx-auto p-6 rounded-2xl border border-gray-200 shadow-xl bg-white space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-extrabold text-gray-800">
            Create a New Agent
          </h1>
          <p className="text-lg text-gray-600">
            Please enter the following details
          </p>
        </div>

        <form onSubmit={onHandleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label htmlFor="Name" className="text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="Name"
              name="Name"
              onChange={onchangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="Email"
              onChange={onchangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="mobile"
              className="text-sm font-medium text-gray-700"
            >
              Mobile
            </label>
            <input
              type="text"
              id="mobile"
              name="Mobile"
              onChange={onchangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            />
          </div>

          <div className="space-y-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="Password"
              onChange={onchangeHandler}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800"
            />
          </div>

          <button
            className={`flex items-center justify-center gap-2 w-full text-center text-xl text-gray-950 font-bold p-3 bg-green-500 rounded-lg hover:bg-green-700 duration-150 ${
              loading ? "cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            <Loader
              className={`${loading ? "inline animate-spin" : "hidden"}`}
            />
            {loading ? "Please wait..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAgent;
