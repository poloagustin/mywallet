var app = require('../app');
var config = require('../config.json');

app.set('port', process.env.PORT || (config.port || 8080));

var server = app.listen(app.get('port'), function() {
});
