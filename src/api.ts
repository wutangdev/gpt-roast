import { Configuration, OpenAIApi } from 'openai';

export const generateRoast = async (imageDataUrl: string, apiKey: string) => {
  // Configure the OpenAI library with your API key
  const configuration = new Configuration({
    apiKey,
  });

  const openai = new OpenAIApi(configuration);

  try {
    // Define the input prompt for the roast
    const prompt = `Roast someone based on this image description: ${imageDataUrl}`;
    // Call the OpenAI API
    const response = await openai.createCompletion({
      model: 'gpt-3.5-turbo',
      prompt,
      max_tokens: 50,
      n: 1,
      stop: null,
      temperature: 0.7,
    });

    // Extract the roast text from the response
    const roast = response.data?.choices?.[0]?.text?.trim();

    if (!roast) {
      throw new Error('Failed to generate roast.');
    }

    return roast;
  } catch (error) {
    console.error('Error generating roast:', error);
    throw error;
  }
};
