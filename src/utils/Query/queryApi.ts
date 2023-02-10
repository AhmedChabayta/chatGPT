import openai from "../chatGpt/chatGpt";

const query = async (prompt: string, chatId: string, model: string) => {
  const response = await openai
    .createCompletion({
      model,
      prompt,
      temperature: 0.9,
      max_tokens: 1000,
      top_p: 1,
      frequency_penalty: 1,
      presence_penalty: 1,
    })
    .then((res) => res.data.choices[0].text)
    .catch(
      (err) => `ChatGPT was not able to find an answer for that ${err.message}`
    );
  return response;
};

export default query;
