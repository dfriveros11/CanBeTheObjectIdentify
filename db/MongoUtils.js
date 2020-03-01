const MongoClient = require("mongodb").MongoClient;

console.log("holi");

//Connect to mongo
function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017,
    dbName = "some-mongo";

  const user = process.env.MONGO_USER,
    pwd = process.env.MONGO_PWD;

  //Getters and Setters
  mu.dbName = _dbName =>
    _dbName !== undefined ? ((dbName = _dbName), mu) : dbName;
  mu.hostname = _hostName =>
    _hostName !== undefined ? ((hostname = _hostName), mu) : hostname;
  mu.port = _port => (_port !== undefined ? ((port = _port), mu) : port);

  mu.connect = () => {
    console.log("Trying to connect");
    let url;
    if (user === undefined) {
      url = process.env.MONGODB_URI;
    } else {
      url = `mongodb://${user}:${pwd}@${hostname}:${port}`;
    }
    console.log(url);
    const cliente = new MongoClient(url, { useUnifiedTopology: true });
    console.log("Connected");
    return cliente.connect();
  };

  mu.getTest = client => {
    const colTest = client.db(dbName).collection("test");
    console.log("getTest");
    return colTest
      .find({})
      .limit(10)
      .toArray()
      .finally(() => client.close());
  };

  return mu;
}
const mu = MongoUtils();

mu.connect()
  .then(client => mu.getTest(client))
  .then(docs => {
    console.log("FUNCIONO", docs.length);
  })
  .catch(err => console.log(err));
module.exports = MongoUtils;
