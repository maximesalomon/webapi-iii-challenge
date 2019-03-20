const express = require('express');
const router = express.Router();
const postDb = require("../data/helpers/postDb");

router.get('/', async (req, res) => {
  try {
    post = await postDb.get(req.query);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await postDb.getById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post information could not be retrieved." });
  }
});

router.post('/', async (req, res) => {
  try {
    const posts = await postDb.insert(req.body);
    const content = await postDb.getById(posts.id)
    if (content.user_id && content.text) {
        res.status(201).json(req.body);
    } else {
        res.status(400).json({ errorMessage: "Please provide user_id and text for the post." })
    }
  } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content = await postDb.getById(req.params.id)
    const post = await postDb.remove(req.params.id);

    if (post > 0) {
      res.status(200).json({
        message: content
      });
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The post could not be removed" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const post = await postDb.update(req.params.id, req.body);
    if (req.body.user_id && req.body.text) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({ errorMessage: "Please provide user_id and text for the post." })
    }
  } catch (error) {
    res.status(500).json({ error: "The post information could not be modified." });
  }
});

module.exports = router;