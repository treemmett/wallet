const MongoClient = require('mongodb').MongoClient;

//Database URL
const url = 'mongodb://localhost:27017';

//Database name
const dbName = 'wallet';

//Connect to server
MongoClient.connect(url, (err, client) => {
  console.log('Connected to server');
  const db = client.db(dbName);

  addUser(db, _ => client.close());
});

function addUser(db, callback){
  //Get the users collection
  const collection = db.collection('users');

  //Insert some users
  collection.insertMany([
    {username: 'admin', email: 'admin@site.com'}, {username: 'user1'}, {username: 'user2'}
  ], (err, res) => {
    console.log('Added 3 users to collection');
    console.log(res);
    callback(res);
  });
}
