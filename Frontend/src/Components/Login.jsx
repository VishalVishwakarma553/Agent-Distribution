import React from "react";

const Login = () => {
  return (
    <div className="flex justify-center items-center h-screen w-full p-2 md:p-0">
    <div className="w-full max-w-lg p-4 rounded-md border border-gray-400 shadow-lg shadow-gray-300 flex-flex-col gap-3 bg-gray-100">
      <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-center">Login</h1>
        <div>
            <h3 className="text-xl font-semibold text-center">Welcome Back</h3>
            <p className="text-lg font-medium text-center">Please enter following details to Login</p>
        </div>
      </div>
      <div className="flex flex-col gap-3">
        <label htmlFor="email" className="flex flex-col gap-2 text-lg font-semibold">
            Email
          <input type="email" id="email" className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800" />
        </label>
        <label htmlFor="email" className="flex flex-col gap-2 text-lg font-semibold">
            Password
          <input type="password" id="email" className="w-full p-2 outline-1 outline-gray-400 rounded-md focus:ring-2 focus:ring-gray-600 duration-150 text-gray-800" />
        </label>
      <button className="w-full text-center text-xl text-gray-950 font-bold p-3 bg-green-500 rounded-lg hover:bg-green-700 duration-150 cursor-pointer">Submit</button>
      </div>
    </div>
    </div>
  );
};

export default Login;
