import OpenAI from "openai";
import axios from "axios";
const ORG_ID = 'org-3owQllujG5dSWRhwQZPrQXcv'
const PROJ_ID = 'proj_OyMaD0S7Udrk4pQ8ZKIDDYD1'
const API_KEY = 'sk-proj-AMEIQfGgh0tHeIWHGXBiT3BlbkFJEuvYUeKdESNjUw3xLjIJ'

new OpenAI({ apiKey: `${API_KEY}` })
/*-H "Content-Type: application/json" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -d '{
"model": "gpt-3.5-turbo",
    "messages": [{"role": "user", "content": "Say this is a test!"}],
    "temperature": 0.7
}'*/
async function callOpenAI(weather) {
    const weatherString = JSON.stringify(weather);
    await axios.post('https://api.openai.com/v1/chat/completions',
        {
            "messages": [{
                "role": "user",
                "content": `Based on the weather conditions provided here, please indicate whether or not it is a good +
                    day to go to the beach. Please consider a range of beach activities, including not only swimming +
                    and sun-bathing, but also picknicking, sports (e.g. beach volleyball, running), kite-flying, surfing +
                    dog-walking, beach-combing, etc. Your answer should reflect these various possibilities; for instance, +
                    in cold weather you might answer that going to the beach for swimming might not be such a good idea, but  +
                    perhaps a walk or a jog along the beach might still be pleasant: ${weatherString}`
            }],
            "temperature": 0.7,

            max_tokens: 300
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        })
        .then(response => {
            console.log(response.data.choices[0].message.content);
        })
        .catch(error => {
            console.error(error);
        });
}

export { callOpenAI }