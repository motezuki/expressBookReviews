const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password){
    return res.status(403).json({message: "Error logging in"});
  }

  if (isValid(username)){
    users.push({"username":username, "password":password});
    return res.status(200).json({message: "Successfully registered"});
  }
  else {
    return res.status(403).json({message: "User " + username + " already exists"});
  }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  new Promise((resolve, reject) => {
    resolve(books);
  })
  .then((books) => {
    res.send(JSON.stringify(books, null, 4));
  })
  .catch((err) => {
    res.status(500).send("Error retrieving books");
  });
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  new Promise((resolve,reject) => {
    resolve(isbn);
  })
  .then((isbn) => {
    res.send(JSON.stringify(books[isbn], null, 4));
  })
  .catch((err) => {
    res.status(500).send("Error retrieving book");
  });
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let author = req.params.author;
  var list = [];
  new Promise((resolve, reject) => {
    resolve(author);
  })
  .then((author) => {
    for (key in books){
      if (books[key].author === author){
        list.push(books[key]);
      }
    }
    return res.send(JSON.stringify(list, null, 4));
  })
  .catch((err) => {
    res.status(500).send("Error retrieving book");
  });
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let title = req.params.title;
  var list = [];
  new Promise((resolve,reject) => {
    resolve(title);
  })
  .then((title) => {
    for (key in books){
      if (books[key].title === title){
        list.push(books[key]);
      }
    }
    res.send(JSON.stringify(list, null, 4));
  })
  .catch((err) => {
    res.status(500).send("Error retrieving book");
  });
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  let isbn = req.params.isbn;
  return res.send(JSON.stringify(books[isbn].reviews, null, 4));
});

module.exports.general = public_users;
