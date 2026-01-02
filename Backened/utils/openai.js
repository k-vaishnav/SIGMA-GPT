import "dotenv/config";

const getOpenAIResponse = async (prompt) => {
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
    }),
  };
  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      options
    );
    const data = await response.json();
    if (!data.choices || !data.choices.length) {
      throw new Error("No response from OpenAI");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error fetching OpenAI response:", error);
  }
};

export default getOpenAIResponse;
