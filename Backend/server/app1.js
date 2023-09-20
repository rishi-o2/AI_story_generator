
// const express = require('express');
// const app = express();
// const OpenAI = require('openai');
// app.use(express.json());

// const port = process.env.PORT || 5000;
// //import OpenAI from 'openai';

// const openai = new OpenAI({
//   apiKey: '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', // defaults to process.env["OPENAI_API_KEY"]
// });

// async function main() {
//   const completion = await openai.chat.completions.create({
//     messages: [{ role: 'user', content: 'Say this is a test' }],
//     model: 'gpt-3.5-turbo',
//   });

//   console.log(completion.choices);
// }

// main();
// const readline = require('readline');

// // Create a readline interface for user input
// const rl = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

// // Define story templates
// const storyTemplates = {
//   beginning: 'Once upon a time, in a land far, far away, there was [characterName], a [characterDescription].',
//   middle: '[characterName] embarked on a journey to [destination]. Along the way, they encountered [obstacle].',
//   end: 'In the end, [characterName] learned [lesson]. And they lived happily ever after.',
// };

// // Initialize an empty story
// let story = '';

// // Function to fill in story templates with user input
// function fillInTemplate(template, userInput) {
//   // Replace placeholders in the template with user input
//   return template.replace(/\[([^]+?)\]/g, (_, key) => userInput[key]);
// }

// // Ask the user for input to fill in the story
// rl.question('Enter the character\'s name: ', (characterName) => {
//   rl.question('Enter a character description: ', (characterDescription) => {
//     rl.question('Enter a destination: ', (destination) => {
//       rl.question('Enter an obstacle: ', (obstacle) => {
//         rl.question('Enter a lesson learned: ', (lesson) => {
//           // Fill in the story templates with user input
//           story += fillInTemplate(storyTemplates.beginning, {
//             characterName,
//             characterDescription,
//           }) + '\n';

//           story += fillInTemplate(storyTemplates.middle, {
//             characterName,
//             destination,
//             obstacle,
//           }) + '\n';

//           story += fillInTemplate(storyTemplates.end, {
//             characterName,
//             lesson,
//           });

//           // Display the generated story
//           console.log('\nGenerated Story:\n');
//           console.log(story);

//           // Close the readline interface
//           rl.close();
//         });
//       });
//     });
//   });
// });
//const axios = require('axios');

// Replace 'YOUR_API_KEY' with your actual OpenAI API key
// const { HfInference } = require("@huggingface/inference");
// const fetch = require("node-fetch");

// (async () => {
//   try {
//     const inference = new HfInference("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"); // Replace with your actual API key
//     const model = "nlpconnect/vit-gpt2-image-captioning";
//     const imgurl = "https://cdn.mos.cms.futurecdn.net/HjFE8NKWuCmgfHCcndJ3rK.jpg";

//     console.log("Fetching image from URL:", imgurl);

//     // Fetch the image
//     const response = await fetch(imgurl);
//     const imageBlob = await response.blob();

//     console.log("Image fetched successfully. Performing inference...");

//     // Perform image-to-text inference
//     const result = await inference.imageToText({
//       data: imageBlob,
//       model: model,
//     });

//     console.log(result);
//   } catch (error) {
//     console.error("Error:", error);
//   }
// })();
// const deepai = require('deepai'); // OR include deepai.min.js as a script tag in your HTML

// deepai.setApiKey('quickstart-QUdJIGlzIGNvbWluZy4uLi4K');

// (async function() {
//     var resp = await deepai.callStandardApi("text-generator", {
//             text: "there was a tiger",
//     });
//     console.log(resp);
// })()
// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/pranavpsv/genre-story-generator-v2",
// 		{
// 			headers: { Authorization: "Bearer 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" },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }

// query({"inputs": "write a story about lion "}).then((response) => {
// 	console.log(JSON.stringify(response));
// });
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

query({"inputs": "Can you please let us know more details about your "}).then((response) => {
	console.log(JSON.stringify(response));
});



