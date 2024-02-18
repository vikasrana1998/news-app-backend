const { Post, Prompt } = require('../models');

exports.preparePost = async (req, res) => {
    try {

        //Create PROMPT for OpenAi in a format so that we can store in our DB and use it.
        const promptArray = [
            { role: 'system', content: 'Rewrite the article in the following JSON format: {"language":"en", "category": from "Business", "Finance", "Sports", "Politics", "Technology", "Science", "Health", "Crime", "Environment", "Entertainment", "External affairs" and "Miscellaneous" in format ["category 1",...], "tags":["tag1",..], "meta_description":"description optimised for SEO", "title":"Summarised title of the news article", "summary":"summarise in crisp and clear 60 words or less", "article":"write a 700-800 words news article in crisp and simple words."}.' },
            { role: 'user', content: postContent }
        ];

        const newPrompt = await Prompt.create({
            prompt: promptArray,
            model: "gpt-3.5-turbo",
        });

        const response = await newPrompt.callOpenAI();

        return res.json({ response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}