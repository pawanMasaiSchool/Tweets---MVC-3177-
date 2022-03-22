const User = require("../Models/user.model");
const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const upload = require("../Utils/fileUpload.js");

router.get("/", async (req,res) => {
    const allUsers = await User.find();
    if(!allUsers){
        res.status(400).send({messege:"No Record Found"})
    }
    console.log("Done");
    res.status(200).send(allUsers)
})

router.get("/:username", async (req,res) => {
    const user = await User.find({
        username: req.params.username
    })
    if(!user) {
        res.status(404).json({messege:"User not found"})
    }
    res.status(200).json(user)
})

const checkFileds = ()=>{
    return [body('username').not().isLength({min:3}).withMessage("Username should be of minimum 3 characters")]
}

router.post("/",
// ...checkFileds(), 

    //single file uploading
    upload.single("avatar"),

    async (req,res) => {
            try{
            console.log(req.file)
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const [user] = await User.insertMany([{
                username:req.body.username,
                email:req.body.email
            }])
            if(!user) {
                res.status(404).json({messege:"User not created"})
            }
            res.status(200).json({user})
        }
        catch(err){
            res.status(400).json("This looks little wrong")
        }
})

router.delete("/", async (req,res) => {
    const obj = await User.deleteOne({
        username:req.body.username
    })
    res.status(200).json({obj})
})

router.patch("/:username", async (req,res) => {
    const modifiedUser = await User.findOneAndUpdate({
        username: req.params.username
    },{
        $set:{
            username:req.body.username
        }
    })
    if(!modifiedUser){
        res.status(400).json({messege:"User Not Modified"})
    }
    res.status(200).json(modifiedUser)
})


module.exports = router