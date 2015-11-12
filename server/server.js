var app = require('./server-config.js');
// Will search for deployment environment port before defaulting to 5000
var port = process.env.PORT || 5000;

app.listen(port);

console.log('Server now listening on port ' + port);
