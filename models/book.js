'use strict';
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
    title: DataTypes.STRING,
    pages: DataTypes.INTEGER,
    authorId: DataTypes.INTEGER
  }, {});
  book.associate = function(models) {
    //A book BELONGS TO an author
    models.book.belongsTo(models.author)
  };
  return book;
};