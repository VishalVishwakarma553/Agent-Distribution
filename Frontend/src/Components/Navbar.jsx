import React, { useContext } from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AppStore } from "../Store/AppStore";
import axioInstance from "../lib/axiosInstance";
import * as XLSX from "xlsx";
import toast from "react-hot-toast";

const Navbar = () => {

  const { agent, setUser } = useContext(AppStore);
  const navigate = useNavigate();
  //File handling
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedExtensions = ["csv", "xlsx", "xls"];
    const fileExtension = file.name.split(".").pop().toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      //todo: add toast
      // setError("Invalid file format. Please upload a CSV, XLSX, or XLS file.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);
      // Optional: Validate required fields
      const validatedData = jsonData.map((row, index) => {
        return {
          FirstName: row.FirstName || "",
          Phone: row.Phone || "",
          Notes: row.Notes || "",
        };
      });
      // setData(validatedData);
      function distributeItems(items, numberOfMembers) {
        const result = Array.from({ length: numberOfMembers }, () => []);
        const baseCount = Math.floor(items.length / numberOfMembers);
        const remainder = items.length % numberOfMembers;

        let index = 0;

        for (let i = 0; i < numberOfMembers; i++) {
          const itemCount = baseCount + (i < remainder ? 1 : 0);
          result[i] = items.slice(index, index + itemCount);
          index += itemCount;
        }

        return result;
      }
      const list = distributeItems(validatedData, agent.length);
      const postData = async (List, agentId) => {
        try {
          await axioInstance.post("/assign/distribute", {
            agentId: agentId,
            List: List,
          });
        } catch (error) {
          // todo:Add Toast
          console.log(error);
        }
      };
      const processData = async () => {
        try {
          const promises = agent.map((agent, index) => {
            if (list[index]) {
              return postData(list[index], agent._id);
            }
          });

          await Promise.all(promises);
          console.log("All data distributed successfully");
          // todo:Tost here
        } catch (error) {
          console.error("Error distributing data:", error);
        }
      };
      processData();
    };
    reader.readAsArrayBuffer(file);
  };

  //Logout
  const handleLogout = async() => {
    try{
      const res = await axioInstance.get("/user/logout")
      if (res?.data?.success) {
        localStorage.setItem("User", null)
        setUser(null)
        navigate("/login")
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
    }catch(error){
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
  } 
  return (
    <div className="fixed inset-0 bg-white shadow-md h-16 flex justify-between px-6 items-center border-b border-gray-200 ">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      <ul className="flex gap-3 items-center">
        <li>
          <button
            onClick={() => navigate("/addAgent")}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm hover:shadow-md transition duration-200"
          >
            Add Agent
          </button>
        </li>
        <li>
          <label htmlFor="upload">
            <input
              id="upload"
              type="file"
              accept=".csv,.xlsx,.xls"
              className="hidden"
              onChange={handleFileUpload}
            />
            <span className="px-4 py-2 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg shadow-sm hover:shadow-md transition duration-200 cursor-pointer inline-block">
              Upload File
            </span>
          </label>
        </li>
        <li>
          <button onClick={handleLogout} className="flex items-center px-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-lg shadow-sm hover:shadow-md transition duration-200">
            <LogOut className="w-4 h-4 mr-2" />
            
            Logout
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
