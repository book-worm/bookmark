var controller = require('./controllers/index');
var router = require('express').Router();

for (var route in controller) {
  router.route("/" + route)
    .get(controller[route].get)
    .post(controller[route].post)
    .put(controller[route].put)
    .delete(controller[route].delete);
}

module.exports = router;