// pages/api/chat.js

import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for security
});

const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { message } = req.body; // Get the user's message from the request

    try {
      // Send a request to the OpenAI API to generate a response
      const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo", // Use GPT-3.5-turbo for chat
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: message },
        ],
        max_tokens: 150, // Limit the response length
      });

      // Send the response text back to the client
      res.status(200).json({ response: completion.data.choices[0].message.content });
    } catch (error) {
      console.error("Error communicating with OpenAI:", error);
      res.status(500).json({ error: "Failed to get response from OpenAI" });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
