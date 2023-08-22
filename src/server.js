import express from "express";

import { db, connectToDb } from "./db.js";

const app = express();
app.use(express.json());

// get specific article info endpoint
app.get("/api/v1/articles/:name", async (req, res) => {
    const { name } = req.params;

    
    const articleInfo = await db.collection("articles").findOne({ name });

    if (articleInfo) {
        res.status(200).json(articleInfo);
    } else {
        res.status(404).send("Article not found");
    }
});

// upvote article endpoint
app.put("/api/v1/articles/:name/upvote", async (req, res) => {
    const { name } = req.params;

    
    await db
        .collection("articles")
        .updateOne({ name }, { $inc: { upvotes: 1 } });

    const updatedArticleInfo = await db
        .collection("articles")
        .findOne({ name });

    if (updatedArticleInfo) {
        // article.upvotes += 1;
        res.status(200).send(
            `${name} has ${updatedArticleInfo.upvotes} upvotes`
        );
    } else {
        res.status(404).send("Article not found");
    }
});

// add comment endpoint
app.post("/api/v1/articles/:name/comments/create", async (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    
    await db
        .collection("articles")
        .updateOne({ name }, { $push: { comments: { postedBy, text } } });

    const updatedArticleInfo = await db
        .collection("articles")
        .findOne({ name });

    if (updatedArticleInfo) {
        res.status(200).send(updatedArticleInfo.comments);
    } else {
        res.status(404).send("Article not found");
    }
});

// connect to db and start server
connectToDb(() => {
    console.log("Connected to db");
    app.listen(8888, () =>
        console.log("Server is listening on port http://localhost:8888...")
    );
} );
    
