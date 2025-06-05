import Agent from "../models/agent.model.js"
import bcrypt from "bcryptjs"

//Add new aggent
export const AddAgent = async(req, res) => {
    try{
        const {Name, Email, Mobile, Password, CreatedBy} = req.body
        if(!Email || !Mobile || !Name || !Password){
            return res.status(401).json({
                message: "All fields are required"
            })
        }
        
        //Checking Agent Existence
        const AgentExistence = await Agent.findOne({Email})
        if(AgentExistence){
            return res.status(401).json({
                message: "Agent with the email already exist"
            })
        }
        //Hashing the password
        const hashedPassword = await bcrypt.hash(Password, 10)
        console.log(hashedPassword)
        //Creatign new agent
        const newAgent = new Agent({
            Name,
            Email,
            Mobile,
            Password: hashedPassword,
            CreatedBy
        })
        await newAgent.save()
        if(!newAgent){
            return res.status(401).json({
                message: "Error in creating agentt"
            })
        }
        //Send the response
        return res.status(200).json({message: "Agent created successfully", agent: newAgent, success: true})
    }catch(error){
        return res.status(401).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
//Get All agent
export const getAllAgent = async(req, res) => {
    try{
        const {CreatedBy} = req.body
        const allAgent = await Agent.find({CreatedBy})
        if(!allAgent){
            return res.status(400).json({message: "Agent does not found"})
        }
        return res.status(200).json({
            message: "All agent",
            Agent: allAgent,
            success: true
        })
    }catch(error){
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

//Delete agent
export const deleteAgent = async(req, res) => {
    try{
        const {agentid} = req.body
        if(!agentid){
            return res.status(400).json({message: "Agent information is missing"})
        }
        //Delete agent
        const deletedAgent = await Agent.findByIdAndDelete(agentid)
        return res.status(200).json({message: "Agent deleted successfully",DeletedAgent: deletedAgent, success:true})
    }catch(error){
        return res.status(400).json({
            message: "Internal server error",
            error: error.message
        })
    }
}