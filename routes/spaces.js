const express = require('express');
const router = express.Router();
const Space = require('../models/space')

/* GET spaces. */
router.get('/', async (req, res, next) => {
  const spaces = await Space.forge({}).fetchAll()
  res.json(spaces.toJSON())
});

/* GET space by id. */
router.get('/:id', async (req, res, next) => {
  const space = await Space.where('id', req.params.id).fetch()
  res.json(space.toJSON())
});

router.post('/', async (req, res) => {
  console.log('request body', req.body)
  const forged = await Space.forge(req.body)
  console.log(forged)

  const space = await forged.save()
    .catch(e => console.log('caught error: ', e))

  console.log('finished', space)
  res.json(space.toJSON())
})


module.exports = router;
