const router = require("express").Router();
const authMiddleware = require("../Middlewares/authMiddleware");
const Lead = require("../Models/LeadSchema");

// Add lead
router.post("/add-lead", async (req, res) => {
  try {
    // console.log(req.body);

    if (req.body.comments === null) {
      req.body.comments = "N/A";
    }

    const newLead = new Lead(req.body);
    await newLead.save();

    res.send({
      success: true,
      message: "Lead Created Successfully!",
    });
  } catch (error) {
    // console.log(error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Get all leads
router.get("/get-all-leads", async (req, res) => {
  try {
    const allLeads = await Lead.find();
    // console.log(allLeads);
    res.send({
      success: true,
      message: "All Leads Fetched",
      data: allLeads,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

// Update existing lead
router.put('/update-lead',async (req,res)=>{
    try {
        const lead = await Lead.findByIdAndUpdate(req.body.leadID,req.body);
        res.send({
            success:true,
            message:'Lead Updated!'
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// Delete lead
router.put('/delete-lead',async (req,res)=>{
    try {
        console.log(req.body);
        await Lead.findByIdAndDelete(req.body.leadID);
        res.send({
            success:true,
            message:"Lead Successfully Deleted"
        })
    } catch (error) {
        res.send({
            success:false,
            message:error.message
        })
    }
})

// get leads for a specific company
router.get('/get-company-leads',authMiddleware ,async(req,res)=>{
  try {
    console.log(req.body);
    const allLeads = await Lead.find({owner:req.body.userID});
    console.log(allLeads);
    res.send({
      success:true,
      message:'Leads fetched successfully',
      data:allLeads
    })
  } catch (error) {
    res.send({
      success:false,
      message:error.message
    })
  }
})

module.exports = router;
