var Sequelize = require("sequelize");
var connectionString = process.env.DATABASE_URL || 'postgres://tunnelsup:SQL@localhost:5432/bookup_development';
var sequelize = new Sequelize(connectionString);

var User = sequelize.define('User', {
  username: Sequelize.STRING,
  profile_img_url : Sequelize.STRING
});

var Book = sequelize.define('Book', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  genre: Sequelize.STRING,
  cover_img_url : Sequelize.STRING
});

User.belongsToMany(Book, {through: 'FavoriteBooks'});
Book.belongsToMany(User, {through: 'FavoriteBooks'});

User.sync();
Book.sync();

exports.User = User;
exports.Book = Book;
