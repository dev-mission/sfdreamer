const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const router = express.Router();
const models = require('../../models');

router.get('/', async (req, res) => {
  const records = await models.Answer.findAll({ order: [['value', 'ASC']] });
  res.json(records.map((record) => record.toJSON()));
});

router.post('/', async (req, res) => {
  try {
    const record = await models.Answer.create(_.pick(req.body, ['value']));
    res.status(HttpStatus.CREATED).json(record.toJSON());
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
});

router.get('/:id', async (req, res) => {
  const record = await models.Answer.findByPk(req.params.id);
  if (record) {
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', async (req, res) => {
  const record = await models.Answer.findByPk(req.params.id);
  if (record) {
    await record.update(_.pick(req.body, ['value']));
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.delete('/:id', async (req, res) => {
  const record = await models.Answer.findByPk(req.params.id);
  if (record) {
    await record.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;
