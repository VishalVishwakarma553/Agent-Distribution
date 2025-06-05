import { useContext, useEffect } from "react";
import axioInstance from "../lib/axiosInstance";
import toast from "react-hot-toast";
import { AppStore } from "../Store/AppStore";

const usegetAllAgent = () => {
  const { setAgent, setAllAgentLoading, user, agent } = useContext(AppStore);
  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await axioInstance.post("/agent/getAgent", {CreatedBy: user._id});
        if (res?.data?.success) {
          setAgent(res?.data?.Agent);
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
        setAllAgentLoading(false);
      }
    };
    fetchAgent();
  }, [agent]);
};

export default usegetAllAgent;
