import { toNumber } from 'lodash';
import { Op, Sequelize } from 'sequelize';

import db from '../utils/db.service';


export class BaseModel {
  static db: Sequelize = db;
  model;

  constructor(modelName: string, attributes) {
    this.model = db.define(modelName, attributes);
  }

  findOne(where: object = {}): Promise<any> {
    return this.model.findOne({ where });
  }

  findAll(where: object = {}, count: number = 50, offset: number = 0, order: any[] = []): Promise<any[]> {
    return this.model.findAll({
      where: { isDeleted: { [Op.not]: true }, ...where },
      limit: toNumber(count),
      offset: toNumber(offset),
      order,
    });
  }

  async update(id: number, data, options = {}) {
    await this.model.update(data, { where: { id, isDeleted: { [Op.not]: true } }, ...options });
    const result = await this.findOne({ id });
    return result;
  }

  delete(id: number): Promise<any[]> {
    return this.model.update({ isDeleted: true }, { where: { id } });
  }
}