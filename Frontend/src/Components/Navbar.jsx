import React, { useContext, useEffect, useRef, useState } from "react";
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
          toast.success("All data distributed successfully", {
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
        localStorage.removeItem("User")
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

  //for mobile view 
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef();

  const closeSidebar = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("mousedown", closeSidebar);
    } else {
      document.body.style.overflow = "auto";
      window.removeEventListener("mousedown", closeSidebar);
    }

    return () => window.removeEventListener("mousedown", closeSidebar);
  }, [isOpen]);

  return (
    <>
    <div className="fixed inset-0 z-50 bg-white h-16 px-4 flex items-center justify-between shadow-md border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-3 items-center">
          <li>
            <button
              onClick={() => navigate("/addAgent")}
              className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-md cursor-pointer"
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
              <span className="px-4 py-2.5 text-sm font-semibold text-white bg-green-600 hover:bg-green-700 rounded-md cursor-pointer">
                Upload File
              </span>
            </label>
          </li>
          <li>
            <button className="flex items-center p-4 py-2 text-sm font-semibold text-white bg-red-500 hover:bg-red-600 rounded-md cursor-pointer" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </li>
        </ul>

        {/* Hamburger Menu */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-800 text-2xl font-bold cursor-pointer hover:text-xl"
          >
            {
              isOpen? <p>&#10006;</p>  : <p>&#9776;</p> 
            }
            
          </button>
        </div>
      </div>

      {/* Sidebar Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black bg-opacity-30 transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Sidebar */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg p-5 transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Menu</h2>
            <button
              className="text-gray-600 text-xl"
              onClick={() => setIsOpen(false)}
            >
              &times;
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <button
                onClick={() => {
                  navigate("/addAgent");
                  setIsOpen(false);
                }}
                className="w-full text-left font-semibold text-blue-600 cursor-pointer hover:underline"
              >
                ➕ Add Agent
              </button>
            </li>
            <li>
              <label htmlFor="uploadMobile">
                <input
                  id="uploadMobile"
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  className="hidden"
                  onChange={(e) => {
                    handleFileUpload(e);
                    setIsOpen(false);
                  }}
                />
                <span className="font-semibold text-green-600 cursor-pointer hover:underline">
                  ⬆️ Upload File
                </span>
              </label>
            </li>
            <li>
              <button
                className="flex items-center font-semibold text-red-500 cursor-pointer hover:underline"
                onClick={() => {
                  setIsOpen(false);
                  handleLogout()
                }}
              >
                <LogOut className="w-4 h-4 mr-2 " />
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
      </>
  );
};

export default Navbar;
