const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username)=>{ //returns boolean
  let userswithsamename = users.filter(user => user.username === username);
  if (userswithsamename.length > 0){
    return false;
  }
  else {
    return true;
  }
}

const authenticatedUser = (username,password)=>{ //returns boolean
  validUser = users.filter(user => user.username === username && user.password === password);
  if (validUser.length > 0){
    return true;
  }
  else {
    return false;
  }
}

//only registered users can login
regd_users.post("/login", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password)
    return res.status(404).json({ message: "Error loggin in"});

  if (authenticatedUser(username,password)){
    let token = jwt.sign({data: username}, "access", {expiresIn: 60*60});

    req.session.authorization = {
      token, username
    }
    return res.status(200).json({message: "User logged in successfully"});
  }
  else {
    return res.status(208).json({message: "Invalid login, please try again"});
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
