

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
        story.dislikes = Math.max(0, story.dislikes - 1); // Ensure dislikes never go below zero
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
        story.likes = Math.max(0, story.likes - 1); // Ensure likes never go below zero
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


  

  


//*********************************************************************************************** */
//import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
// });

// async function main() {
//   try {
//     const completion = await openai.chat.completions.create({
//       messages: [{ role: 'user', content: 'Say this is a test' }],
//       model: 'gpt-3.5-turbo',
//     });

//     console.log(completion.choices);
//   } catch (error) {
//     console.error('Error:', error);
//   }
// }

// You need to define the 'app' and 'port' variables somewhere in your code.
// Assuming you have already defined them, you should place the 'app.listen' part here.

// For example:
// const app = express();
// const port = 3000;

// Define your routes and middleware for your Express application here.
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).send('Something broke!');
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// main();



