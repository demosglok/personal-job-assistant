// config/database.js

const mongoHost = process.env.IMONGO_HOST || 'localhost';
const mongoPort = process.env.MONGO_PORT || '27017';
const mongoUser = process.env.MONGO_USER;
const mongoPassword = process.env.MONGO_PASSWORD;
const mongoDatabaseName = process.env.MONGO_DATABASE_NAME;
let mongoAuth = '';
if(mongoUser) {
  mongoAuth = mongoUser+':'+mongoPassword+'@';
}

const mongoOptions = {

    useNewUrlParser: true,
    useUnifiedTopology: true
};

module.exports = {
    'mongoUrl': process.env.MONGO_URL || `mongodb://${mongoAuth}${mongoHost}:${mongoPort}/${mongoDatabaseName}`,
    mongoOptions
};
