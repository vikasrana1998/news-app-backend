const { z } = require('zod');
const { Post, Prompt } = require('../models');

exports.preparePost = async (req, res) => {
    try {
        // Validate
        const contentSchema = z.object({
            content: z.string().min(100),
            image: z.string().url().optional(),
            url: z.string().url().optional()
        });

        const { content, image, url } = contentSchema.parse(req.body);


        //Create PROMPT for OpenAi in a format so that we can store in our DB and use it.
        const promptArray = [
            { role: 'system', content: 'Rewrite the article in the following JSON format: {"language":"en", "category": from "Business", "Finance", "Sports", "Politics", "Technology", "Science", "Health", "Crime", "Environment", "Entertainment", "External affairs" and "Miscellaneous" in format ["category 1",...], "tags":["tag1",..], "meta_description":"description optimised for SEO", "title":"Summarised title of the news article", "summary":"summarise in crisp and clear 60 words or less", "article":"write a 700-800 words news article in crisp and simple words."}.' },
            { role: 'user', content: content }
        ];

        const newPrompt = await Prompt.create({
            prompt: promptArray,
            model: "gpt-3.5-turbo",
        });

        // OpenAI call
        const response = JSON.parse(await newPrompt.callOpenAI());

        //Create a new Post
        const newPost = await Post.create({
            title: response.title,
            excerpt: response.summary,
            content: content,
            meta_description: response.meta_description,
            image: image || null,
            url: url || null
        });

        return res.status(201).json({ message: 'Post Created', data: response });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}