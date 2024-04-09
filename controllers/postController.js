const { z } = require("zod");
const slugify = require("slugify");
const { Post, Prompt, Category, Tag } = require("../models");

exports.preparePost = async (req, res) => {
    try {
        // Validate
        const contentSchema = z.object({
            content: z.string().min(100),
            image: z.string().url().optional(),
            url: z.string().url().optional(),
        });

        const { content, image, url } = contentSchema.parse(req.body);

        //Create PROMPT for OpenAi in a format so that we can store in our DB and use it.
        const promptArray = [
            {
                role: "system",
                content:
                    'Rewrite the article in the following JSON format: {"language":"en", "category": from "Business", "Finance", "Sports", "Politics", "Technology", "Science", "Health", "Crime", "Environment", "Entertainment", "External affairs" and "Miscellaneous" in format ["category 1",...], "tags":["tag1",..], "meta_description":"description optimised for SEO", "title":"Summarised title of the news article", "summary":"summarise in crisp and clear 60 words or less", "article":"write a 700-800 words news article in crisp and simple words."}.',
            },
            { role: "user", content: content },
        ];

        const newPrompt = await Prompt.create({
            prompt: promptArray,
            model: "gpt-3.5-turbo",
        });

        // OpenAI call
        const response = JSON.parse(await newPrompt.callOpenAI());

        //Category of content provided
        const categoryNames = response.category;
        const categoryIds = [];
        for (const categoryName of categoryNames) {
            const slugToMatch = slugify(categoryName, { lower: true, strict: true });
            const category = await Category.findOne({ where: { slug: slugToMatch } }); //From db match the category and get ids
            if (category) {
                categoryIds.push(category.id);
            }
        }

        //OPTIMISED VERSION GET REPONSE IN SINGLE QUERY
        // // Find all categories matching the provided slugs in a single query
        // const categories = await Category.findAll({
        //     where: {
        //         name: {
        //             [Op.in]: categoryNames // Find categories where slug is in categoryNames array
        //         }
        //     }
        // });
        // const categoryIds = categories.map(category => category.id);

        //Tag of content provided
        const tagNames = response.tags;
        const tagsToBeAttached = [];
        for (const tagName of tagNames) {
            const slugToMatch = slugify(tagName, { lower: true, strict: true });
            const [tag, created] = await Tag.findOrCreate({
                // Find or create the tag
                where: { slug: slugToMatch },
                defaults: { name: tagName },
            });
            tagsToBeAttached.push(tag.id);
        }

        //Create a new Post
        const newPost = await Post.create({
            title: response.title,
            excerpt: response.summary,
            content: content,
            meta_description: response.meta_description,
            image: image || null,
            url: url || null,
        });

        await newPost.addCategories(categoryIds);
        await newPost.addTags(tagsToBeAttached);

        return res.status(201).json({ message: "Post Created", data: response });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getRecentPost = async (req, res) => {
    try {
        res.status(200).json({message:"demo check"});
    } catch (error) {
        res.status(500).json({message:"fail"});
    }
}