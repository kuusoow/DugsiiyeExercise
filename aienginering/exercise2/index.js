import OpenAI from "openai";
import Replicate from "replicate";
import fs from "fs/promises";
import "dotenv/config";



const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});



const theme = "space exploration";

const prompt = `Create a beautiful AI artwork about ${theme}`;



const generateWithOpenAI = async () => {
  console.log("Generating image with OpenAI...");

  const response = await openai.images.generate({
    model: "gpt-image-1",
    prompt: prompt,
    size: "1024x1024",
  });

  return response.data[0].url;
};



const generateWithReplicate = async () => {
  console.log("Generating image with Replicate...");

  const output = await replicate.run(
    "black-forest-labs/flux-schnell",
    {
      input: {
        prompt: prompt,
        num_outputs: 1,
        aspect_ratio: "1:1",
        output_format: "png",
      },
    }
  );

  return output[0];
};



const generateWithFal = async () => {
  console.log("Generating image with fal.ai...");

  const response = await fetch(
    "https://fal.run/fal-ai/flux/schnell",
    {
      method: "POST",

      headers: {
        "Authorization": `Key ${process.env.FAL_KEY}`,
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        prompt: prompt,
        image_size: "square_hd",
        num_images: 1,
      }),
    }
  );

  const data = await response.json();

  return data.images[0].url;
};



const saveImage = async (imageUrl, filename) => {
  console.log(`Saving ${filename}...`);

  const response = await fetch(imageUrl);

  const buffer = await response.arrayBuffer();

  await fs.writeFile(
    `./output/${filename}`,
    Buffer.from(buffer)
  );

  console.log(`Saved: ${filename}`);
};



const main = async () => {
  console.log("Starting image generation...");

  await fs.mkdir("./output", {
    recursive: true,
  });


  
  const openaiImage = await generateWithOpenAI();

  const replicateImage = await generateWithReplicate();

  const falImage = await generateWithFal();


  
  await saveImage(
    openaiImage,
    "openai-image.png"
  );

  await saveImage(
    replicateImage,
    "replicate-image.png"
  );

  await saveImage(
    falImage,
    "fal-image.png"
  );


  console.log("\nAll 3 images generated!");
};



main();