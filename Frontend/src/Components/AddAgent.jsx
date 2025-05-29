import React, { useState } from "react";

const AddAgent = () => {
  const [agentDetail, setAgentDetail] = useState({
    Name: "",
    Email: "",
    Mobile: "",
    Password: "",
  });
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axioInstance.post("/user/login", formContent);
      if (res?.data?.success) {
        localStorage.setItem("User", res.data.user);
        setUser(res.data.user);
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
  const onchangeHandler = (e) => {
    setAgentDetail({ ...agentDetail, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex mt-2 w-full p-2 md:p-0">
      <div className="w-full max-w-lg mx-auto p-4 rounded-md border border-gray-400 shadow-lg shadow-gray-300 flex-flex-col gap-3 bg-gray-100">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-center">Create a New Agent</h1>
          <p className="text-lg font-medium text-center">
            Please enter following details to create new agent
          </p>
        </div>
        <form onSubmit={onHandleSubmit} className="flex flex-col gap-3">
          <label
            htmlFor="Name"
            className="flex flex-col gap-2 text-lg font-semibold"
          >
            Name
            <input
              type="text"
              id="Name"
              name="Name"
              onChange={onchangeHandler}
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
              onChange={onchangeHandler}
              className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800"
            />
          </label>
          <label
            htmlFor="mobile"
            className="flex flex-col gap-2 text-lg font-semibold"
          >
            Mobile
            <input
              type="text"
              id="mobile"
              name="Mobile"
              onChange={onchangeHandler}
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
              onChange={onchangeHandler}
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

export default AddAgent;
