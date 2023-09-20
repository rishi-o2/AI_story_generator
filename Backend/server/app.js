

const express = require('express');
const app = express();
const OpenAI = require('openai');
app.use(express.json());
const deepai = require('deepai');
const mongoose = require("mongoose");
require("../modules/story");
require("../db/conn")
const Story = mongoose.model("Story");

const port = process.env.PORT || 5000;

app.post('/GPT', async (req, res) => {
  const UserInput = req.body.data;
  console.log(UserInput)
  
  async function query(data) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/rathi/storyGenerator",
      {
        headers: { Authorization: "Bearer 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" },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }
  
  query({"inputs": UserInput}).then(async(response) => {
    res.json(response)
    console.log(response[0].generated_text)
    const newStory = new Story({
      storyPrompt: UserInput,
      generatedStory: response[0].generated_text,
    });
    try {
      const savedStory = await newStory.save();
    } catch (error) {
      console.error("Error saving story:", error);
      res.status(500).json({ error: "Error saving story" });
    }
    app.post('/like/:storyId', async (req, res) => {
      const storyId = req.params.storyId;
      try {
        const story = await Story.findById(storyId);
        if (!story) {
          return res.status(404).json({ error: 'Story not found' });
        }
        story.likes++;
        story.dislikes = Math.max(0, story.dislikes - 1); 
        await story.save();
        res.json({ message: 'Story liked successfully', story });
      } catch (error) {
        console.error('Error liking story:', error);
        res.status(500).json({ error: 'Error liking story' });
      }
    });
    
    app.post('/dislike/:storyId', async (req, res) => {
      const storyId = req.params.storyId;
      try {
        const story = await Story.findById(storyId);
        if (!story) {
          return res.status(404).json({ error: 'Story not found' });
        }
        story.dislikes++;
        story.likes = Math.max(0, story.likes - 1); 
        await story.save();
        res.json({ message: 'Story disliked successfully', story });
      } catch (error) {
        console.error('Error disliking story:', error);
        res.status(500).json({ error: 'Error disliking story' });
      }
    });
  });
});

app.get('/stories', async (req, res) => {
  try {
    const stories = await Story.find().sort({ likes: -1 });
    res.json(stories);
  } catch (error) {
    console.error('Error fetching stories:', error);
    res.status(500).json({ error: 'Error fetching stories' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


  

  





