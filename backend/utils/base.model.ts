import { Sequelize } from 'sequelize';

import db from '../utils/db.service';


export class BaseModel {
  static db: Sequelize = db;
  model;

  constructor(modelName: string, attributes) {
    this.model = db.define(modelName, attributes);
  }
}