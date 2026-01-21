import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';

const addLeave = async (req, res) => {
  
 try{
        const { userId, leaveType, startDate, endDate, reason } = req.body;
        const employee = await Employee.findOne({ userId: userId });
         const newLeave = new Leave({
             employeeId: employee._id,
             leaveType,
             startDate,
             endDate,
             reason,
             
         });
         await newLeave.save();
         res.status(200).json({ success: true });
     } catch (error) {
         res.status(500).json({ message: error.message });
     }
 }

const getLeavesByEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id });
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        const leaves = await Leave.find({ employeeId: employee._id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, leaves });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getAllLeaves = async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Forbidden' })
        }
        const leaves = await Leave.find()
            .populate({ path: 'employeeId', populate: { path: 'userId', select: '-password' } })
            .sort({ createdAt: -1 })
        return res.status(200).json({ success: true, leaves })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

const updateLeaveStatus = async (req, res) => {
    try {
        if (req.user?.role !== 'admin') {
            return res.status(403).json({ success: false, error: 'Forbidden' })
        }
        const { id } = req.params
        const { status } = req.body
        if (!['approved', 'rejected'].includes(status)) {
            return res.status(400).json({ success: false, error: 'Invalid status' })
        }
        const updated = await Leave.findByIdAndUpdate(
            { _id: id },
            { status },
            { new: true }
        )
        if (!updated) {
            return res.status(404).json({ success: false, error: 'Leave not found' })
        }
        return res.status(200).json({ success: true, leave: updated })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export { addLeave, getLeavesByEmployee, getAllLeaves, updateLeaveStatus }