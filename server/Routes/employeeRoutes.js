const authMiddleware = require('../Middlewares/authMiddleware');
const Employee = require('../Models/EmployeeSchema');
const User = require('../Models/UserSchema');
const express = require('express');
const router = express.Router();

// add employee
router.post('/add-employee',async(req,res)=>{
    try {
        const newEmployee = new Employee(req.body);
        await newEmployee.save();
        res.send({
            success:true,
            message:'Employee Created Successfully'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})


// Get employees by company
router.get('/get-employees-by-company',authMiddleware,async(req,res)=>{
    try {
        const employeesByCompany = await Employee.find({owner:req.body.userID});
        res.send({
            success:true,
            message:'Employees fetch successful!',
            data:employeesByCompany
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Get all the employees
router.get('/get-all-employees',async(req,res)=>{
    try {
        const allEmployees = await Employee.find();
        res.send({
            success:true,
            message:'All employees fetched!',
            data:allEmployees
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Delete an employee

router.put('/delete-employee',async(req,res)=>{
    try {
        await Employee.findByIdAndDelete(req.body.empID);
        res.send({
            success:true,
            message:"Employee deleted successfully"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Update employee

router.put('/update-employee',async(req,res)=>{
    try {
        // console.log(req.body);
        const employee = await Employee.findByIdAndUpdate(req.body.empID,req.body);
        console.log(employee);
        res.send({
            success:true,
            message:'Employee details updated'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

module.exports = router;
