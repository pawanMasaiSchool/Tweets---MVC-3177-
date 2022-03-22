const Tweet = require("../Models/tweet.model");
const express = require("express");
const router = express.Router();


router.get("/", async (req,res) => {
    try{
        const allTweets = await Tweet.find()
        if(!allTweets) res.status(404).json({messege:"No Tweets Found"});
        res.status(200).json(allTweets)
    }
    catch(err){
        res.status(500).json({messege:"This Looks Little Wrong"})
    }
})

router.get("/:id", async (req,res) => {
    try{
        const tweet = await Tweet.find({id:req.params.id})
        if(!tweet) res.status(404).json({messege:"No Tweets Found"});
        res.status(200).json(tweet)
    }
    catch(err){
        res.status(500).json({messege:"This Looks Little Wrong"})
    }
})

router.post("/", async (req,res) => {
    try{
        const newTweet = Tweet.insertMany([{
            title:req.body.title,
            body:req.body.body,
            tags:req.body.tags,
            user_id:req.body.user_id
        }])
        res.status(200).json(newTweet)
    }
    catch(err){
        res.status(500).json({messege:"This Looks Little Wrong"})
    }
})

router.delete("/:id", async (req,res) => {
    try{
        const deleting = await Tweet.deleteOne({
            id:req.params.id
        })
        res.status(200).json(deleting)
    }
    catch(err){
        res.status(500).json({messege:"This Looks Little Wrong"})
    }
})

module.exports = router