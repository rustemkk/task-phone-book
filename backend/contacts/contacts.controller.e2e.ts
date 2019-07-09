import { expect } from 'chai';

import testService from '../utils/test.service';


before(async () => {
  await testService.destroyTables(['Contacts']);
  await testService.init();
});

after(() => testService.close());

describe('Contacts e2e tests', () => {

  it('Should create 2 contacts', async () => {
    let res = await testService.post('/api/contacts', {
      name: 'Luke Skywalker',
      phone: '+8 (888) 8888888',
    });
    expect(res.body.name).to.equal('Luke Skywalker');

    res = await testService.post('/api/contacts', {
      name: 'Coco De Chanel',
      phone: '+45 (1212) 1232111',
    });
    expect(res.body.name).to.equal('Coco De Chanel');
    expect(res.body.phone).to.equal('+45 (1212) 1232111');
  });

  it('Should get 2 contacts ordered by name ASC', async () => {
    const res = await testService.get('/api/contacts');
    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Coco De Chanel');
    expect(res.body[1].name).to.equal('Luke Skywalker');
    testService.data.contacts = res.body;
  });

  it('Should get 2 contacts ordered by phone DESC', async () => {
    const res = await testService.get('/api/contacts?orderBy=phone&orderDirection=DESC');
    expect(res.body.length).to.equal(2);
    expect(res.body[0].name).to.equal('Luke Skywalker');
    expect(res.body[1].name).to.equal('Coco De Chanel');
  });

  it('Should get 1 contact (pagination)', async () => {
    const res = await testService.get('/api/contacts?count=1&offset=1');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('Luke Skywalker');
    testService.data.contacts = res.body;
  });

  it('Should delete one contact', async () => {
    let res = await testService.delete(`/api/contacts/${testService.data.contacts[0].id}`);
    res = await testService.get('/api/contacts?orderBy=phone&orderDirection=DESC');
    expect(res.body.length).to.equal(1);
    testService.data.contacts = res.body;
  });

  it('Should update contact', async () => {
    let res = await testService.put(`/api/contacts/${testService.data.contacts[0].id}`, {
      name: 'Luke Skywalker 111',
      phone: '+8 (888) 8888889',
    });
    expect(res.body.name).to.equal('Luke Skywalker 111');
    expect(res.body.phone).to.equal('+8 (888) 8888889');

    res = await testService.get('/api/contacts');
    expect(res.body.length).to.equal(1);
    expect(res.body[0].name).to.equal('Luke Skywalker 111');
  });

});