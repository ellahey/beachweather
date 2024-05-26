import { CohereClient } from "cohere-ai";

const message = 'Given the weather conditions provided, tell me if it is a good day to go to the beach. Please' +
            'be specific about the suitability of the weather for a range of different beach activities, including' +
            'swimming, surfing, sunbathing, hanging out / relaxing, picnicking, sports (volleyball, running), kite flying, or other common' +
            'beach activities:'
const cohere = new CohereClient({
    token: "p2EfjR0YJnhbA9d29JCeiIEHqZ1frEKfcA71lOnl", // This is your trial API key
});


async function chat(weather) {
    const stream = await cohere.chatStream(
        {
        model: "command-r-plus",
        message: `${message} ${weather}`,
        promptTruncation: "AUTO",
        connectors: [{"id":"web-search"}]
    });

    for await (const chat of stream) {
        if (chat.eventType === "text-generation") {
            process.stdout.write(chat.text);
        }
    }
}


export{chat}