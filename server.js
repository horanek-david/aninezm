const express = require("express");
const app = express();
const req = require("express/lib/request");
const ObjectId = require("mongodb").ObjectID;
const bodyParse= require("body-parser");
const path = require("path");
const { header } = require("express/lib/request");
const { ObjectID } = require("bson");
const { async } = require("rxjs");

function getClient(){
  const MongoClient = require("mongodb").MongoClient;
  //const uri = "mongodb+srv://David9:David2000@cluster0.oh0sz.mongodb.net/aninezm?retryWrites=true&w=majority";
  const uri = "mongodb://localhost:27017";
  return new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true});
}

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    next();
  });


// Felhasználó létrehozása (Regisztráció)

app.get("/users", function (req, res) {
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("users");
    const users = await collection.find().toArray();
    res.send(users);
    client.close();
  });
});

app.post('/register', bodyParse.json(), function(req, res){
  const newUser={
      name: req.body.name,
      password: req.body.password,
      email: req.body.email
  };

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("users");
    const result = await collection.insertOne(newUser);
    if(!result.insertedCount){
    res.send({error: "insert error"});
    return;
    }
    res.send(newUser);
    client.close();
  });
});

app.get("/series", function (req, res) {
  const client = getClient();


  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("series");
  const series = await collection.find().toArray();
    res.send(series);
    client.close();
  });
});

function getID(raw){
  try{
    return new ObjectId(raw);
  }catch(err){
    return "";
  }
};

app.delete("/series/:id", function(req, res){
  const id = new getID(req.params.id);
  if(!id){
    res.send({error: "invalide id"});
    return;
  }
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("series");
    const result = await collection.deleteOne({_id: id});
    if(!result.deletedCount){
      res.send({error: "not found"});
      return;
    }
    res.send({id: req.params.id});
    client.close;
  });
});

app.post('/series', bodyParse.json(), function(req, res){
  const newSeries={
      name: req.body.name,
      genre: req.body.genre,
      published: req.body.published
  };

  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("series");
    const result = await collection.insertOne(newSeries);
    if(!result.insertedCount){
    res.send({error: "insert error"});
    return;
    }
    res.send(newSeries);
    client.close();
  });
});

app.post("/series_seen/:id", bodyParse.json(), function(req, res){
  const id = new getID(req.params.id);
  if(!id){
    res.send({error: "invalide id"});
    return;
  }
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("series");
    var myquery = {_id: id};
    var newvalues = {$set: {seen: 1}};
    const result = await collection.updateOne(myquery, newvalues, function(err, res){
      if(err){
        throw err;
      }
    });
    res.send(newvalues);
    client.close;
  });
});

app.post("/series_unseen/:id", bodyParse.json(), function(req, res){
  const id = new getID(req.params.id);
  if(!id){
    res.send({error: "invalide id"});
    return;
  }
  const client = getClient();
  client.connect(async (err) => {
    const collection = client.db("aninezm").collection("series");
    var myquery = {_id: id};
    var newvalues = {$set: {seen: 0}};
    const result = await collection.updateOne(myquery, newvalues, function(err, res){
      if(err){
        throw err;
      }
    });
    res.send(newvalues);
    client.close;
  });
});

  

app.listen(4000);