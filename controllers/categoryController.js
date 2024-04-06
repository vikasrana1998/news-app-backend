const { Category } = require("../models");

exports.getCategory = async (req, res) => {
    try {
        const result = await Category.findAll({
            attributes: ["id", "name", "slug", "image_url"],
        });
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
};
