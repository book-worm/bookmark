var Sequelize = require("sequelize");
var connectionString = process.env.DATABASE_URL || 'postgres://tunnelsup:SQL@localhost:5432/bookup_development';
var sequelize = new Sequelize(connectionString);

var User = sequelize.define('User', {
  username: Sequelize.STRING,
});


User.sync();

exports.User = User;
