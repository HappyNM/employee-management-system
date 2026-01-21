import Department from '../models/Department.js';

const getDepartments = async (req, res) => {
    try {
        const departments = await Department.find();
        return res.status(200).json({success:true, departments});
    } catch (error) {
    return res.status(500).json({success:false, message: error.message || "Server Error"})    
        
    }
}
const addDepartment = async (req, res) => {
try {
    const { dep_name, description } = req.body;
    
    if (!dep_name) {
        return res.status(400).json({success:false, message:"Department name is required"});
    }
    
    const newDep = new Department({ dep_name, description });
    await newDep.save();
    return res.status(201).json({success:true, message:"Department added successfully", department: newDep});
} catch (error) {
    console.log("Add Department Error:", error.message);
    return res.status(500).json({success:false, message: error.message || "Server Error"})    
}
}
const editDepartment= async (req, res) => {
    try{
        const {id} = req.params;
        const department = await Department.findById({_id :id});
        return res.status(200).json({success:true, department});
    } catch (error) {
    return res.status(500).json({success:false, message: error.message || "Server Error"})    
        
    }
    
}
const updateDepartment = async (req, res) => {
    try {
        const {dep_name, description} = req.body;
        const {id} = req.params;
        const updatedDep = await Department.findByIdAndUpdate(id, {dep_name, description}, {new:true});
        return res.status(200).json({success:true, message:"Department updated successfully", department: updatedDep});
    } catch (error) {
        return res.status(500).json({success:false, message: error.message || "Server Error"})      
    }
}
const deleteDepartment = async (req, res) => {
    try {
        const {id} = req.params;
        const deletedep= await Department.findByIdAndDelete(id);
        return res.status(200).json({success:true, message:"Department deleted successfully"});
    } catch (error) {
        return res.status(500).json({success:false, message: error.message || "Server Error"})      
    }
}
export { addDepartment, getDepartments, editDepartment, updateDepartment, deleteDepartment };