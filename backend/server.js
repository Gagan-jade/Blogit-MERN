const express = require('express')
const dotenv = require('dotenv')
const { MongoClient } = require('mongodb')
const path = require('path')
 




dotenv.config();

const url = process.env.String


const client = new MongoClient(url)
const Database = client.db("Blogit");
const CollectionForArticleInfo = Database.collection("Articles");
const CollectionForArticleContent = Database.collection("Content");
const Users = Database.collection("Users");

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(express.static(path.join(__dirname, './build')));

async function Connection() {
    try {
        await client.connect();
    }
    catch (error) {
    }
}

app.get(/^(?!\/api).+/, (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'))
})

app.put('/api/articlesUpvote/:articleName', async (req, res) => {
    const { articleName } = req.params;
    try {
        const data = req.body;
        let article = await CollectionForArticleInfo.findOne({ articleName: articleName })
        if (article && article.articleName === articleName) {
            await CollectionForArticleInfo.updateOne({ articleName: articleName }, { $inc: { upvotes: 1 } })
            await CollectionForArticleInfo.updateOne({ articleName: articleName }, { $push: { likedBy: data.likedBy } })
            await CollectionForArticleInfo.createIndex({ likedBy: 1 })
            article = await CollectionForArticleInfo.findOne({ articleName: articleName })
        }
        else {
            res.send("Article doesn't exist")
        }
    }
    catch (error) {
    }
})

app.put('/api/articles/reduceLikeCount', async (req, res) => {
    try {
        const data = req.body;
        let article = await CollectionForArticleInfo.findOne({ articleName: data.articleName })
        if (article && article.articleName === data.articleName) {
            await CollectionForArticleInfo.updateOne({ articleName: data.articleName }, { $inc: { upvotes: -1 } })
            await CollectionForArticleInfo.updateOne({ articleName: data.articleName }, { $pull: { likedBy: data.likedBy } })
            article = await CollectionForArticleInfo.findOne({ articleName: data.articleName })
        }
        res.send("Done")
    } catch (err) {
        res.send("Failed")
    }
})

app.post('/api/articlesComments/:articleName', async (req, res) => {
    const { articleName } = req.params
    const { userName, Comment } = req.body
    try {
        let article = await CollectionForArticleInfo.findOne({ articleName: articleName })
        if (article && article.articleName === articleName) {
            await CollectionForArticleInfo.updateOne({ articleName: articleName }, { $push: { comment: { userName: userName, text: Comment } } })
            article = await CollectionForArticleInfo.findOne({ articleName: articleName })
            res.send(article.comment)
        }
        else
            res.send("Article not found")
    }
    catch (error) {
    }
})

app.get('/api/articles/articleInfo/:articleName', async (req, res) => {
    const { articleName } = req.params
    res.send(await CollectionForArticleInfo.findOne({ articleName: articleName }))
})

app.post('/api/articles/content/:articleName', async (req, res) => {
    const data = req.body;
    const { articleName } = req.params;
    CollectionForArticleContent.insertOne({ postedBy: data.postedBy, articleName: articleName, content: data.content })
    CollectionForArticleInfo.insertOne({ articleName: articleName, upvotes: 0, comment: [] })
})

app.get('/api/articles/content/:articleName', async (req, res) => {
    const { articleName } = req.params;
    const data = await CollectionForArticleContent.findOne({ articleName: articleName })
    res.send(data)
})

app.get('/api/articles/allArticles', async (req, res) => {
    const allArticles = await CollectionForArticleContent.find({}, -1).toArray()
    res.send(allArticles)
})

app.post('/api/users/addUsers', async (req, res) => {
    const data = req.body;
    if (!(await Users.findOne({ userName: data.newUserName }))) {
        await Users.insertOne({ userName: data.newUserName, password: data.password });
        res.send("Success")
    }
    else
        res.send("Exists")

})

app.post('/api/users/authenticate', async (req, res) => {
    const data = req.body
    if (!(await Users.findOne({ userName: data.newUserName }))) {
        res.send("NoUser")
    }

    else if ((await Users.findOne({ userName: data.newUserName })).password != data.password)
        res.send("InvalidPassword")
    else
        res.send("Success")
})


app.put('/api/articles/updateComments/:articleName', async (req, res) => {
    const { articleName } = req.params
    await CollectionForArticleInfo.updateOne({ articleName: articleName }, { $push: { comment: req.body } })
})


app.listen(PORT, async () => {
    await Connection();
})