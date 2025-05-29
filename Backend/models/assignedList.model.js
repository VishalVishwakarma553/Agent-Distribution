import mongoose from "mongoose"

const AssignedListSchema = new mongoose.Schema({
    agentId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true
    },
    List:{
        type: [{
            FirstName: {
                type: String,
                required:true
            },
            Phone: {
                type: String,
                required: true
            },
            Notes: {
                type: String,
                required: true
            }
        }],
        default: []
    }
}, {timestamps:true})

const AssignedList = mongoose.model("AssignedList", AssignedListSchema)
export default AssignedList