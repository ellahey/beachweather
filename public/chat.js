import 'dotenv/config'
import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY // This is the default and can be omitted
});

async function callOpenAI(weatherString) {
    const stringBody = weatherString.requestBody;
    const prompt = `Based on the weather conditions provided here, please indicate whether or not it is a good +
                    day to go to the beach. Here are the current weather conditions: ${stringBody}`
console.log(`Here is the prompt: ${prompt}`)
    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `${prompt}`}],
        model: 'gpt-3.5-turbo'
    });
    console.log(chatCompletion.choices[0].message)
    return chatCompletion.choices[0].message.content;
}

export { callOpenAI }