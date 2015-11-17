var Sequelize = require("sequelize");

/*
* Extract DB Connection string if on deployed environment. Otherwise use default.
* If testing locally, make a POSTGRES DB with the same specifications.
* u/n: 'tunnelsup'
* pwd: 'SQL'
* port: 5432 (This is the default Postgres port)
* DB name: 'bookup_development'
*/
var connectionString = process.env.DATABASE_URL || 'postgres://tunnelsup:SQL@localhost:5432/bookup_development';
var sequelize = new Sequelize(connectionString);

/**
 * 'User' ORM object. Maintains id from Goodreads, username and profile pic URL.
 * Contains a separate id value for primary key.
 *
 * @type {ORM Object}
 */
var User = sequelize.define('User', {
  goodreadsId: Sequelize.INTEGER,
  username: Sequelize.STRING,
  profile_img_url: Sequelize.STRING
});

/**
 * 'Book' ORM object. Maintains title, author, genre and cover pic URL.
 *
 * @type {ORM Object}
 */
var Book = sequelize.define('Book', {
  title: Sequelize.STRING,
  author: Sequelize.STRING,
  genre: Sequelize.STRING,
  cover_img_url: Sequelize.STRING
});

/*
 * Initialize join table between users and their favorite books.
 * This was such a PITA to figure out.
 */
User.belongsToMany(Book, {as: "FavoriteBook", through: "FavoriteBooks"});
Book.belongsToMany(User, {as: "FavoriteUser", through: "FavoriteBooks"});

User.belongsToMany(Book, {as: "CurrentBook", through: "CurrentBooks"});
Book.belongsToMany(User, {as: "CurrentUser", through: "CurrentBooks"});

/*
 * Initialize join table between users and their bookmarks.
 * And rejects...
 */
User.belongsToMany(User, {as: "Bookmark", through: "Bookmarks"});
User.belongsToMany(User, {as: "Reject", through: "Rejects"});

/*
 * Create tables if they don't already exist.
 * Use {force: true} argument to wipe tables each time you restart node.
 * Good for testing, but BE CAREFUL.
 */
sequelize.sync();

exports.User = User;
exports.Book = Book;
