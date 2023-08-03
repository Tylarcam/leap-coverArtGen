import { NextApiRequest, NextApiResponse } from "next";
import { Leap } from "@leap-ai/sdk";


const MODEL_ID = "cb1673da-55f3-4ec8-bfbc-c9375bfcb4e8";
const IMAGE_WIDTH = 450;
const IMAGE_HEIGHT = 450;


const generate = async (req: NextApiRequest, res: NextApiResponse) => {
  const prompt = req.body.prompt as string;
  const apiKey = process.env.LEAP_API_KEY as string;
  
  console.log('One sec grabbing some dope art for you...')
  if (!prompt || prompt.length === 0 || !apiKey) {
    res.status(400).json({ error: "Invalid request. Check key and prompt." });
    return;
  }

  const leap = new Leap(apiKey);

  const { data, error } = await leap.generate.generateImage({
    modelId: MODEL_ID, // This is the model ID for the album cover generator 
    prompt, // This is the prompt for the album cover generator
    width: IMAGE_WIDTH, // This is the width of the image 
    height: IMAGE_HEIGHT,   // This is the height of the image
    numberOfImages: 3, // This is the number of images to generate
  });

  if (error) {
    res.status(500).json(error);
    return;
  }

  res.status(200).json(data);
};

export default generate;

