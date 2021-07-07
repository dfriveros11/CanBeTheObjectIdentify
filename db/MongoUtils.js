const MongoClient = require("mongodb").MongoClient;

//Comentario Juan Felipe Torres: Me gustó el hecho de que tengan su user y password de la base de datos estén en variables de entorno, 
// es seguro y se ve bien.

//Connect to mongo
function MongoUtils() {
  const mu = {};

  let hostname = "localhost",
    port = 27017,
    dbName = "heroku_3lrh51h6",
    colName = "some-mongo";

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
    const cliente = new MongoClient(url);
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

  mu.users = {};

  mu.users.findUser = userName =>
    mu.connect().then(client => {
      const usersC = client.db(dbName).collection(colName);
      // when searching by id we need to create an ObjectID
      return usersC
        .findOne({ userName: userName })
        .finally(() => client.close());
    });

  mu.users.insertUser = user =>
    mu.connect().then(client => {
      const usersC = client.db(dbName).collection(colName);
      return usersC.insertOne(user).finally(() => client.close());
    });

  mu.users.find = client => {
    const usersC = client.db(dbName).collection(colName);
    return usersC
      .find()
      .sort({ score: -1 })
      .toArray();
  };

  mu.users.updateScore = (userName, newScore) =>
    mu.connect().then(client => {
      const usersC = client.db(dbName).collection(colName);
      return usersC
        .updateOne({ userName: userName }, { $set: { score: newScore } })
        .finally(() => client.close());
    });

  return mu;
}
const mu = MongoUtils();
module.exports = MongoUtils;
