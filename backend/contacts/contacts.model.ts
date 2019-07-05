import { DataTypes } from 'sequelize';

import { BaseModel } from '../utils/base.model';


const contactsModel = new BaseModel('Contacts', {
  name: {
    type: DataTypes.INTEGER,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  isDeleted: {
    type: DataTypes.BOOLEAN
  },
});

export default contactsModel;