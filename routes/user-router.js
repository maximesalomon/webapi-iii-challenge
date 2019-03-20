const express = require('express');
const router = express.Router();
const userDb = require("../data/helpers/userDb");

router.get('/', async (req, res) => {
  try {
    user = await userDb.get(req.query);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "The users information could not be retrieved." });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await userDb.getById(req.params.id);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The user information could not be retrieved." });
  }
});

router.get('/:id/posts', async (req, res) => {
    try {
      const user = await userDb.getUserPosts(req.params.id);
  
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." });
      }
    } catch (error) {
      res.status(500).json({ error: "The user posts information could not be retrieved." });
    }
  });

router.post('/', async (req, res) => {
  try {
    const users = await userDb.insert(req.body);
    const content = await userDb.getById(users.id)
    if (content.name) {
        res.status(201).json(req.body);
    } else {
        res.status(400).json({ errorMessage: "Please provide name for the user." })
    }
  } catch (error) {
        res.status(500).json({ error: "There was an error while saving the user to the database" });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const content = await userDb.getById(req.params.id)
    const user = await userDb.remove(req.params.id);

    if (user > 0) {
      res.status(200).json({
        message: content
      });
    } else {
      res.status(404).json({ message: "The user with the specified ID does not exist." });
    }
  } catch (error) {
    res.status(500).json({ error: "The user could not be removed" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const user = await userDb.update(req.params.id, req.body);
    if (req.body.name) {
      res.status(200).json(req.body);
    } else {
      res.status(400).json({ errorMessage: "Please provide a name for the user." })
    }
  } catch (error) {
    res.status(500).json({ error: "The user information could not be modified." });
  }
});

module.exports = router;