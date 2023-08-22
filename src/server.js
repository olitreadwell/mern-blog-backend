import express from "express";

const app = express();
app.use(express.json());

// upvote article endpoint
app.put("/api/v1/articles/:name/upvote", (req, res) => {
    const { name } = req.params;
    const article = articlesInfo.find((article) => article.name === name);
    if (article) {
        article.upvotes += 1;
        res.status(200).send(`${name} now has ${article.upvotes} upvotes`);
    } else {
        res.status(404).send("Article not found");
    }   
});

// add comment endpoint
app.post("/api/v1/articles/:name/comments/create", (req, res) => {
    const { name } = req.params;
    const { postedBy, text } = req.body;

    const article = articlesInfo.find((article) => article.name === name);

    if (article) {
        article.comments.push({ postedBy, text });
        res.status(200).send(article.comments);
    } else {
        res.status(404).send("Article not found");
    }
});

app.listen(8888, () =>
  console.log("Server is listening on port http://localhost:8888...")
);
