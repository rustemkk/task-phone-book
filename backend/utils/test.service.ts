import * as request from 'supertest';

import app from '../index';
import db from './db.service';


class TestService {
  req;
  server;

  async init() {
    if (!this.server) {
      this.server = await app;
      this.req = request(this.server);
    }
  }

  close() {
    this.server.close();
  }

  get(url: string): Promise<any> {
    const prom = this.req
      .get(url)
      .set('Content-Type', 'application/json');
    return prom;
  }

  post(url: string, body: object): Promise<any> {
    const prom = this.req
      .post(url)
      .send(JSON.stringify(body))
      .set('Content-Type', 'application/json');
    return prom;
  }

  delete(url: string): Promise<any> {
    const prom = this.req
      .del(url)
      .set('Content-Type', 'application/json');
    return prom;
  }

  async destroyTables(tableNames) {
    for (let i = 0; i < tableNames.length; i++) {
      await db.define(tableNames[i], {}).destroy({ where: {} });
    }
  }
}

export default new TestService();