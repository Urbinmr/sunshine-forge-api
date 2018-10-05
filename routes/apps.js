const express = require('express');
const router = express.Router();
const App = require('../models/app')

/* GET apps. */
router.get('/', async (req, res, next) => {
  const apps = await App.forge({}).fetchAll()
  res.json(apps.toJSON())
});

/* GET space by id. */
router.get('/:id', async (req, res, next) => {
  const app = await App.where('id', req.params.id).fetch()
  res.json(app.toJSON())
});

router.post('/', async (req, res) => {
  const app = await App.forge(req.body).save()
  res.json(app.toJSON())
})

router.patch('/:id', async (req, res) => {
  const app = await App.forge(req.body).save()
  res.json(app.toJSON())
})

router.delete('/:id', async (req, res) => {
  await App.forge({ id: req.params.id }).destroy();
  res.sendStatus(200)
})

module.exports = router;
