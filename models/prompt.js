'use strict';
const OpenAI = require('openai').OpenAI;
const openai = new OpenAI();
const { Model } = require('sequelize');


module.exports = (sequelize, DataTypes) => {
  class Prompt extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
    async callOpenAI() {
      try {
        const chatCompletion = await openai.chat.completions.create({
          messages: this.prompt,
          model: this.model
        });

        this.response = JSON.stringify(chatCompletion);
        this.promptTokens = chatCompletion.usage.prompt_tokens;
        this.responseTokens = chatCompletion.usage.completion_tokens;

        await this.save();

        return chatCompletion.choices[0].message.content;
      } catch (error) {
        console.error('Error generating response:', error);
        throw error;
      }
    }
  }
  Prompt.init({
    prompt: DataTypes.ARRAY(DataTypes.JSON),
    response: DataTypes.TEXT,
    model: DataTypes.STRING,
    configuration: DataTypes.STRING,
    promptTokens: DataTypes.SMALLINT,
    responseTokens: DataTypes.SMALLINT
  }, {
    sequelize,
    modelName: 'Prompt',
    tableName: 'prompts'
  });
  return Prompt;
};