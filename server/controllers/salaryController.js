import Salary from '../models/Salary.js';
import Employee from '../models/Employee.js';

const addSalary = async (req, res) => {
    try{
        const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;
        const totalSalary = parseInt(basicSalary) + parseInt(allowances) - parseInt(deductions);
        const newSalary = new Salary({
            employeeId,
            basicSalary,
            allowances,
            deductions,
            netSalary: totalSalary,
            payDate
        });
        await newSalary.save();
        res.status(200).json({ success: true });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const getSalariesByEmployeeId = async (req, res) => {
    try {
        const { id } = req.params;
        const salaries = await Salary.find({ employeeId: id }).populate({
            path: 'employeeId',
            populate: [
                { path: 'userId', select: 'name' },
                { path: 'department', select: 'dep_name' }
            ]
        });
        const employee = await Employee.findById(id).populate('userId', 'name');
        return res.status(200).json({ success: true, salaries, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

const getSalariesByUserId = async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await Employee.findOne({ userId: id }).populate('userId', 'name');
        if (!employee) {
            return res.status(404).json({ success: false, error: "Employee not found" });
        }
        const salaries = await Salary.find({ employeeId: employee._id }).sort({ createdAt: -1 });
        return res.status(200).json({ success: true, salaries, employee });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
}

// exports moved to bottom
const getMonthlySummary = async (req, res) => {
    try {
        const now = new Date()
        const start = new Date(now.getFullYear(), now.getMonth(), 1)
        const end = new Date(now.getFullYear(), now.getMonth() + 1, 1)

        const totalAgg = await Salary.aggregate([
            { $match: { payDate: { $gte: start, $lt: end } } },
            { $group: { _id: null, total: { $sum: "$netSalary" }, count: { $sum: 1 } } }
        ])
        const total = totalAgg[0]?.total || 0
        const count = totalAgg[0]?.count || 0
        return res.status(200).json({ success: true, month: now.getMonth() + 1, year: now.getFullYear(), total, count })
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message })
    }
}

export { addSalary, getSalariesByEmployeeId, getSalariesByUserId, getMonthlySummary };