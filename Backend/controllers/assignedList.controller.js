import AssignedList from "../models/assignedList.model.js"

export const distributeList = async(req, res) => {
    try{
        const {agentId, List} = req.body
        if(!agentId || !List){
            return res.status(400).json("Agent id or Assigned list is missing")
        }
        //Assign list
        const assign = new AssignedList({
            agentId,
            List
        })
        await assign.save()
        if(!assign){
            return res.status(401).json({message: "Error in distributed list"})
        }
        return res.status(200).json({message: "List distributed successfully", AssignList: assign, success: true})
    }catch(error) {
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

//get distributed list by id
export const List = async(req, res) => {
    try{
        const {agentId} = req.params
        if(!agentId){
            return res.status(400).json({message: "Agent Id is missing"})
        }
        const list = await AssignedList.find({agentId})
        if(!list){
            return res.status(401).json({message: "Thare are no list"})
        }
        return res.status(200).json({message: "List fetched successfully", List:list, success: true})
    }catch(error){
        return res.status(500).json({message:"Internal server error"})
    }
}