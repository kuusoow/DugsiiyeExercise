import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Generate a blog outline
const generateOutline = async (topic) => {
  const response = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are a helpful blog writing assistant."
      },
      {
        role: "user",
        content: `Create a simple blog outline about ${topic}`
      }
    ]
  });

  return response.choices[0].message.content;
};


const topic = "Benefits of learning JavaScript";


const outline = await generateOutline(topic);

console.log("Blog Outline:");
console.log(outline);