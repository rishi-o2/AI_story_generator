const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const storySchema = new mongoose.Schema({
  storyPrompt: {
    type: String,
    //required: true,
    trim: true,
  },
  generatedStory: {
    type: String,
    //required: true,
    trim: true,
  },
  likes: { type: Number, default: 0 },
  dislikes:{type: Number, default: 0},

});

mongoose.model("Story", storySchema);
