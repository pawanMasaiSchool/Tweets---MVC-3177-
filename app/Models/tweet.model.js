const mongoose = require('mongoose');

const TweetSchema = new mongoose.Schema({
    title:{type:String, required:true},
    body:{type:String, required:true},
    tags:{type:Array,required:true},
    user_id:{type:String,required:true}
})

const Tweet = mongoose.model("Tweet",TweetSchema,"tweets");

module.exports = Tweet