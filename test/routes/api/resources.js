const assert = require('assert');
const HttpStatus = require('http-status-codes');
const _ = require('lodash');
const session = require('supertest-session');

const helper = require('../../helper');
const app = require('../../../app');
const models = require('../../../models');

describe('/api/resources', () => {
  let testSession;

  beforeEach(async () => {
    await helper.loadFixtures(['users', 'categories', 'resources']);
    testSession = session(app);
  });

  context('unauthenticated', () => {
    describe('GET /', () => {
      it('returns a list of records', async () => {
        const response = await testSession.get('/api/resources').set('Accept', 'application/json').expect(HttpStatus.OK);
        assert(response.body?.length, 2);

        const records = response.body;
        assert.deepStrictEqual(records[0].name, 'Housing Resource');
        assert.deepStrictEqual(records[1].name, 'Immigration Resource');
      });
    });

    describe('GET /:id', () => {
      it('returns a record by its id', async () => {
        /// request user list
        const response = await testSession.get('/api/resources/2').set('Accept', 'application/json').expect(HttpStatus.OK);

        assert.deepStrictEqual(response.body, {
          id: 2,
          CategoryId: 2,
          name: 'Immigration Resource',
          website: 'https://www.immigrationresource.org/',
          description: 'This is a test Resource for the Immigration Category',
          address: null,
          contactperson: null,
          email: null,
          lat: null,
          lng: null,
          logo: null,
          logoUrl: null,
          orgtype: null,
          phone: null,
          createdAt: response.body.createdAt,
          updatedAt: response.body.updatedAt,
        });
      });
    });

    describe('POST /', () => {
      it('requires admin authentication', async () => {
        await testSession.post('/api/resources').set('Accept', 'application/json').send({}).expect(HttpStatus.UNAUTHORIZED);
      });
    });

    describe('PATCH /', () => {
      it('requires admin authentication', async () => {
        await testSession.patch('/api/resources/1').set('Accept', 'application/json').send({}).expect(HttpStatus.UNAUTHORIZED);
      });
    });
  });

  context('authenticated', () => {
    beforeEach(async () => {
      await testSession
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({ email: 'regular.user@test.com', password: 'abcd1234' })
        .expect(HttpStatus.OK);
    });

    describe('POST /', () => {
      it('creates a new record', async () => {
        const response = await testSession
          .post('/api/resources')
          .set('Accept', 'application/json')
          .send({
            CategoryId: '1',
            name: 'A new Housing Resource',
            website: 'https://www.newhousingresource.org/',
            description: 'This is a new test Housing Resource',
          })
          .expect(HttpStatus.CREATED);

        const record = await models.Resource.findByPk(response.body.id);
        assert(record);
        assert.deepStrictEqual(record.CategoryId, 1);
        assert.deepStrictEqual(record.name, 'A new Housing Resource');
        assert.deepStrictEqual(record.website, 'https://www.newhousingresource.org/');
        assert.deepStrictEqual(record.description, 'This is a new test Housing Resource');
      });
    });

    describe('PATCH /:id', () => {
      it('updates a record by its id', async () => {
        const response = await testSession
          .patch('/api/resources/2')
          .set('Accept', 'application/json')
          .send({
            name: 'Updated Immigration Resource Name',
            description: 'Updated Immigration Resource Description',
          })
          .expect(HttpStatus.OK);

        const record = await models.Resource.findByPk(2);
        assert(record);
        assert.deepStrictEqual(record.CategoryId, 2);
        assert.deepStrictEqual(record.name, 'Updated Immigration Resource Name');
        assert.deepStrictEqual(record.website, 'https://www.immigrationresource.org/');
        assert.deepStrictEqual(record.description, 'Updated Immigration Resource Description');
      });
    });
  });
});
