import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axioInstance from "../lib/axiosInstance";
import { Loader } from "lucide-react";
const AssignedList = () => {
  const { agentId } = useParams();
  const [listOfAssignedTask, setListOfAssignedTask] = useState([]);
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const fetchAssignedList = async () => {
      try {
        const res = await axioInstance.get(`/assign/list/${agentId}`);
        if (res?.data?.success) {
          setListOfAssignedTask(res.data.List[0].List);
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
      } finally{
        setLoading(false)
      }
    };
    fetchAssignedList();
  }, []);
  if (loading) {
    return (
      <div className="w-sreen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 animate-spin " /> <span>Loading..</span>
        </div>
      </div>
    );
  }
  return listOfAssignedTask.length <= 0 ? (
    <div className="text-center">No any task assigned yet</div>
  ) : (
    <div className="grid grid-cols-1 gap-4 p-4">
      {listOfAssignedTask.map((item, index) => (
        <div
          key={index}
          className="p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <h2 className="text-lg font-semibold text-gray-800">
            FullName: {item.FirstName}
          </h2>
          <p className="text-gray-600 mt-1">Phone Number: {item.Phone}</p>
          <p className="text-gray-700 mt-2">Note: {item.Notes}</p>
        </div>
      ))}
    </div>
  );
};

export default AssignedList;
