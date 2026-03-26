import Leave from '../models/Leave.js';
import Employee from '../models/Employee.js';
import User from "../models/User.js";
import { sendEmail } from "../services/emailService.js";

const formatDate = (value) => {
  if (!value) return "N/A";
  return new Date(value).toLocaleDateString("en-GB");
};

const sendLeaveSubmittedEmailToAdmins = async ({ leave, employee }) => {
  const admins = await User.find({ role: "admin" }).select("name email");
  const adminEmails = admins.map((a) => a.email).filter(Boolean);

  if (!adminEmails.length) return;

  const employeeName = employee?.userId?.name || "Employee";
  const subject = "New Leave Request Submitted";
  const text = [
    `A new leave request was submitted by ${employeeName}.`,
    `Type: ${leave.leaveType}`,
    `From: ${formatDate(leave.startDate)}`,
    `To: ${formatDate(leave.endDate)}`,
    `Reason: ${leave.reason}`
  ].join("\n");

  const html = `
    <h3>New Leave Request Submitted</h3>
    <p><strong>Employee:</strong> ${employeeName}</p>
    <p><strong>Type:</strong> ${leave.leaveType}</p>
    <p><strong>From:</strong> ${formatDate(leave.startDate)}</p>
    <p><strong>To:</strong> ${formatDate(leave.endDate)}</p>
    <p><strong>Reason:</strong> ${leave.reason}</p>
  `;

  await sendEmail({
    to: adminEmails.join(","),
    subject,
    text,
    html
  });
};

const sendLeaveDecisionEmailToEmployee = async ({ leave }) => {
  const employeeEmail = leave?.employeeId?.userId?.email;
  const employeeName = leave?.employeeId?.userId?.name || "Employee";

  if (!employeeEmail) return;

  const subject = `Your leave request was ${leave.status}`;
  const text = [
    `Hi ${employeeName},`,
    `Your leave request has been ${leave.status}.`,
    `Type: ${leave.leaveType}`,
    `From: ${formatDate(leave.startDate)}`,
    `To: ${formatDate(leave.endDate)}`
  ].join("\n");

  const html = `
    <p>Hi ${employeeName},</p>
    <p>Your leave request has been <strong>${leave.status}</strong>.</p>
    <p><strong>Type:</strong> ${leave.leaveType}</p>
    <p><strong>From:</strong> ${formatDate(leave.startDate)}</p>
    <p><strong>To:</strong> ${formatDate(leave.endDate)}</p>
  `;

  await sendEmail({
    to: employeeEmail,
    subject,
    text,
    html
  });
};
const addLeave = async (req, res) => {
  try {
    const { userId, leaveType, startDate, endDate, reason } = req.body;

    const employee = await Employee.findOne({ userId }).populate({
      path: "userId",
      select: "name email"
    });

    if (!employee) {
      return res.status(404).json({ success: false, error: "Employee not found" });
    }

    const newLeave = new Leave({
      employeeId: employee._id,
      leaveType,
      startDate,
      endDate,
      reason
    });

    await newLeave.save();

    try {
      await sendLeaveSubmittedEmailToAdmins({ leave: newLeave, employee });
    } catch (mailError) {
      console.log("Leave submit mail error:", mailError.message);
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

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
    if (req.user?.role !== "admin") {
      return res.status(403).json({ success: false, error: "Forbidden" });
    }

    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ success: false, error: "Invalid status" });
    }

    const leave = await Leave.findById(id).populate({
      path: "employeeId",
      populate: { path: "userId", select: "name email" }
    });

    if (!leave) {
      return res.status(404).json({ success: false, error: "Leave not found" });
    }

    leave.status = status;
    await leave.save();

    try {
      await sendLeaveDecisionEmailToEmployee({ leave });
    } catch (mailError) {
      console.log("Leave decision mail error:", mailError.message);
    }

    return res.status(200).json({ success: true, leave });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

export { addLeave, getLeavesByEmployee, getAllLeaves, updateLeaveStatus }