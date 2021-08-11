const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const router = express.Router();
const models = require('../../models');

router.get('/', async (req, res) => {
  const records = await models.Category.findAll({ order: [['name', 'ASC']] });
  res.json(records.map((record) => record.toJSON()));
});

router.post('/', async (req, res) => {
  try {
    const record = await models.Category.create(_.pick(req.body, ['name', 'slug', 'summary', 'icon']));
    res.status(HttpStatus.CREATED).json(record.toJSON());
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
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
  const record = await models.Category.findByPk(req.params.id);
  if (record) {
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.get('/:slug', async (req, res) => {
  const record = await models.Category.findOne({ where: { slug: req.params.slug } });
  if (record) {
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const record = await models.Category.findByPk(req.params.id);
    if (record) {
      await record.update(_.pick(req.body, ['name', 'slug', 'summary', 'icon']));
      res.json(record.toJSON());
    } else {
      res.status(HttpStatus.NOT_FOUND).end();
    }
  } catch (error) {
    if (error.name === 'SequelizeValidationError' || error.name === 'SequelizeUniqueConstraintError') {
      res.status(HttpStatus.UNPROCESSABLE_ENTITY).json({
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        errors: error.errors,
      });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).end();
    }
  }
});

router.delete('/:id', async (req, res) => {
  const record = await models.Category.findByPk(req.params.id);
  if (record) {
    await record.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;
