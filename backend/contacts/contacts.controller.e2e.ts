import { expect } from 'chai';

import testHelper from '../utils/test.service';


before(async () => {
  await testHelper.destroyTables(['Contacts']);
  await testHelper.init();
});

after(() => testHelper.close());

describe('Contacts e2e tests', () => {

  it('Should create 2 contacts', async () => {
    let res = await testHelper.post('/api/contacts/create', {
      name: 'Luke Skywalker',
      phone: '+8 (888) 8888888',
    });
    expect(res.body.name).to.equal('Luke Skywalker');

    res = await testHelper.post('/api/contacts/create', {
      name: 'Coco De Chanel',
      phone: '+45 (1212) 1232111',
    });
    expect(res.body.name).to.equal('Coco De Chanel');
    expect(res.body.phone).to.equal('+45 (1212) 1232111');
  });

  it('Should get 2 contacts ordered by name ASC', async () => {
    const res = await testHelper.get('/api/contacts');
    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Coco De Chanel');
    expect(res.body[1].name).to.equal('Luke Skywalker');
  });

  it('Should get 2 contacts ordered by phone DESC', async () => {
    const res = await testHelper.get('/api/contacts?orderBy=phone&orderDirection=DESC');
    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Luke Skywalker');
    expect(res.body[1].name).to.equal('Coco De Chanel');
  });

});