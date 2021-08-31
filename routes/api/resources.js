const express = require('express');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');

const router = express.Router();
const models = require('../../models');
const interceptors = require('../interceptors');

router.get('/', async (req, res) => {
  const options = { order: [['name', 'ASC']] };
  if (req.query.categoryId) {
    options.include = [models.Category];
    if (/^\d+$/.test(req.query.categoryId)) {
      options.where = {
        CategoryId: req.query.categoryId,
      };
    } else {
      options.where = {
        '$Category.slug$': req.query.categoryId,
      };
    }
  }
  const records = await models.Resource.findAll(options);
  res.json(records.map((record) => record.toJSON()));
});

router.post('/', interceptors.requireLogin, async (req, res) => {
  try {
    const record = await models.Resource.create(
      _.pick(req.body, [
        'name',
        'logo',
        'orgtype',
        'contactperson',
        'phone',
        'address',
        'lat',
        'lng',
        'email',
        'website',
        'CategoryId',
        'city',
        'state',
        'zip',
        'description',
      ])
    );
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
  const record = await models.Resource.findByPk(req.params.id);
  if (record) {
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.patch('/:id', interceptors.requireLogin, async (req, res) => {
  const record = await models.Resource.findByPk(req.params.id);
  if (record) {
    await record.update(
      _.pick(req.body, [
        'name',
        'logo',
        'orgtype',
        'contactperson',
        'phone',
        'address',
        'lat',
        'lng',
        'email',
        'website',
        'CategoryId',
        'city',
        'state',
        'zip',
        'description',
      ])
    );
    res.json(record.toJSON());
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

router.delete('/:id', async (req, res) => {
  const record = await models.Resource.findByPk(req.params.id);
  if (record) {
    await record.destroy();
    res.status(HttpStatus.OK).end();
  } else {
    res.status(HttpStatus.NOT_FOUND).end();
  }
});

module.exports = router;
