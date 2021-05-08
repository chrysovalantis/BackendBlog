const express = require('express');
const createWriterRouter = require('./routes/writer/create');
const readWriterRouter = require('./routes/writer/read');
const updateWriterRouter = require('./routes/writer/update');
const deleteWriterRouter = require('./routes/writer/delete');

const createBlogRouter = require('./routes/blog/create');
const readBlogRouter = require('./routes/blog/read');
const updateBlogRouter = require('./routes/blog/update');
const deleteBlogRouter = require('./routes/blog/delete');

const createArticleRouter = require('./routes/articles/create');
const readArticleRouter = require('./routes/articles/read');
const updatArticleeBlogRouter = require('./routes/articles/update');
const deleteArticleRouter = require('./routes/articles/delete');

const publishArticleRouter = require('./routes/publish/publish');

const app = express();

app.use(express.json());

// routes
app.use(createWriterRouter);
app.use(readWriterRouter);
app.use(updateWriterRouter);
app.use(deleteWriterRouter);

app.use(createBlogRouter);
app.use(readBlogRouter);
app.use(updateBlogRouter);
app.use(deleteBlogRouter);

app.use(createArticleRouter);
app.use(readArticleRouter);
app.use(updatArticleeBlogRouter);
app.use(deleteArticleRouter);

app.use(publishArticleRouter);


app.all('*', async (req,res) => {
  res.status(404).send({"Message":"Page Not Found"})
});

module.exports = app;