// Create web server

const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Comment = require("./models/comment");
const Post = require("./models/post");
const seedDB = require("./seed");

mongoose.connect("mongodb://localhost:27017/comments", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

seedDB();

app.get("/", function(req, res) {
    res.redirect("/posts");
});

// INDEX - show all posts
app.get("/posts", function(req, res) {
    // Get all posts from DB
    Post.find({}, function(err, allPosts) {
        if (err) {
            console.log(err);
        } else {
            res.render("posts/index", {posts: allPosts});
        }
    });
});

// NEW - show form to create new post
app.get("/posts/new", function(req, res) {
    res.render("posts/new");
});

// CREATE - add new post to DB
app.post("/posts", function(req, res) {
    // Get data from form and add to posts array
    const name = req.body.name;
    const image = req.body.image;
    const desc = req.body.description;
    const newPost = {name: name, image: image, description: desc};
    // Create a new post and save to DB
    Post.create(newPost, function(err, newlyCreated) {
        if (err) {
            console.log(err);
        } else {
            // Redirect back to posts page
            res.redirect("/posts");
        }
    });
});

// SHOW - show more info about one post
app.get("/posts/:id", function(req, res) {
    // Find the post with provided ID
    Post.findById(req.params.id).populate("comments").exec(function(err, foundPost) {
        if (err) {
            console.log(err);
        } else {
            // Render show template with that post
            res.render("posts/show", {post: foundPost});
        }
    });
});

// ============================
// COMMENTS ROUTES
// ============================

app.get("/posts/:id/comments/new", function(req, res) {
    // Find post by ID
    Post.findById(req.params.id, function(err, post) {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new", {