const express = require('express');
const router = express.Router();
const Space = require('../models/space')

/* GET spaces. */
router.get('/', async (req, res, next) => {
  const spaces = await Space.forge().fetchAll({ withRelated: ['apps'] })
  res.json(
    spaces.map(s => {
      const space = s.toJSON()
      space.apps = s.related('apps').toJSON()
      return space
    }))
});

/* GET space by id. */
router.get('/:id', async (req, res, next) => {
  const space = await Space.where('id', req.params.id).fetch({ withRelated: 'apps' })
  res.json(space.toJSON())
});

router.post('/', async (req, res) => {
  const space = await Space.forge(req.body).save()
  res.json(space.toJSON())
})

router.patch('/:id', async (req, res) => {
  const space = await Space.forge(req.body).save()
  res.json(space.toJSON())
})

router.delete('/:id', async (req, res) => {
  await Space.forge({ id: req.params.id }).destroy();
  res.sendStatus(200)
})

module.exports = router;
