import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true
    },
    leaveType: {
        type: String, required: true,
        enum:['sick','casual','annual']

    },
    startDate: {
        type: Date, required: true
    },
    endDate: {
        type: Date, required: true
    },
    reason: {
        type: String, required: true
    },
    status: {
        type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending'
    }
}, { timestamps: true });   
const Leave = mongoose.model('Leave', leaveSchema);
export default Leave;