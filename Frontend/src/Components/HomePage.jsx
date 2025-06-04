import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import usegetAllAgent from "../customHook/usegetAllAgent";
import { AppStore } from "../Store/AppStore";
import { Loader, Trash } from "lucide-react";
import axioInstance from "../lib/axiosInstance";
const HomePage = () => {
  const { agent, allAgentLoading } = useContext(AppStore);
  const navigate = useNavigate();
  usegetAllAgent();
  // const handleDelete = async()
  const HandleDeleteAgent = async (agentid) => {
    try {
      const res = await axioInstance.delete("/agent/deleteAgent", agentid);
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
    }
  };
  if (allAgentLoading) {
    return (
      <div className="w-sreen h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
          <Loader className="w-8 h-8 animate-spin " /> <span>Loading..</span>
        </div>
      </div>
    );
  }
  return agent.length <= 0 ? (
    <div className="flex flex-col gap-4 justify-center items-center h-screen">
      <div className="flex gap-1 flex-col text-center">
        <h1 className="text-3xl font-bold text-zinc-600">
          There are no any agent
        </h1>
        <p className="text-lg font-medium text-zinc-500">
          Please add agent and upload file to distribute
        </p>
      </div>
      <button
        onClick={() => navigate("/addAgent")}
        className="p-4 text-sm font-semibold bg-gray-500 hover:shadow-lg shadow-gray-600 hover:bg-gray-600 rounded-md duration-150 cursor-pointer"
      >
        Add Agent
      </button>
    </div>
  ) : (
    <div className="grid grid-cols-1 gap-4 p-6 ">
      {agent.map((agent) => (
        <div
          key={agent._id}
          className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 border border-gray-200 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white relative"
        >
          <div className="space-y-2">
            <h1 className="text-xl font-semibold text-gray-800">
              {agent.Name}
            </h1>
            <div className="text-gray-600">
              <h2 className="text-sm font-medium uppercase tracking-wide text-gray-500">
                Details:
              </h2>
              <p>
                Email: <span className="font-medium">{agent.Email}</span>
              </p>
              <p>
                Mobile: <span className="font-medium">{agent.Mobile}</span>
              </p>
            </div>
          </div>
          <button
            className="absolute right-3 top-3 text-gray-800 cursor-pointer hover:text-gray-900 "
            onClick={() => HandleDeleteAgent(agent._id)}
          >
            <Trash className="w-6 h-6 hover:w-5.5 hover:h-5.5 duration-150" />
          </button>
          <Link to={`/assign/${agent._id}`} className="mt-4 md:mt-0">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 cursor-pointer">
              See Assigned List
            </button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
