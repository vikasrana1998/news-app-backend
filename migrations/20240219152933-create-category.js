'use strict';
const slugify = require('slugify');
const { Category } = require('../models');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Categories', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      image_url: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
    const categories = [
      { name: "Business", imageUrl: "https://img.icons8.com/?size=512&id=YjTRjnlGiNzf&format=png" },
      { name: "Finance", imageUrl: "https://img.icons8.com/?size=512&id=jYfREIf9jfO7&format=png" },
      { name: "Sports", imageUrl: "https://img.icons8.com/?size=512&id=ZyTWZwGPAAnl&format=png" },
      { name: "Politics", imageUrl: "https://cdn-icons-png.flaticon.com/512/10618/10618295.png" },
      { name: "Technology", imageUrl: "https://img.icons8.com/?size=512&id=101827&format=png" },
      { name: "Science", imageUrl: "https://img.icons8.com/?size=512&id=ciHODT4VQFvL&format=png" },
      { name: "Health", imageUrl: "https://img.icons8.com/?size=512&id=zpwNliQWPfVi&format=png" },
      { name: "Crime", imageUrl: "https://img.icons8.com/?size=512&id=8635&format=png" },
      { name: "Environment", imageUrl: "https://img.icons8.com/?size=512&id=dKrkkocArbkM&format=png" },
      { name: "Entertainment", imageUrl: "https://img.icons8.com/?size=512&id=2772&format=png" },
      { name: "External affairs", imageUrl: "https://img.icons8.com/?size=512&id=48922&format=png" },
      { name: "Miscellaneous", imageUrl: "https://img.icons8.com/?size=512&id=4XcYkLc689Qv&format=png" }
    ];

    // Insert categories into the database
    const promises = categories.map(async category => {
      try {
        const slug = slugify(category.name, { lower: true, strict: true }); // Generate slug
        await Category.create({
          name: category.name,
          slug: slug,
          image_url: category.imageUrl,
        });
        console.log(`Category "${category.name}" created successfully.`);
      } catch (error) {
        console.error(`Error creating category "${category.name}":`, error);
      }
    });

    await Promise.all(promises);

  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Categories');
  }
};