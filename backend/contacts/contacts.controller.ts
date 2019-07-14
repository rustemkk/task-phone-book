import * as fs from 'fs';
import { toNumber } from 'lodash';
import { Op } from 'sequelize';

import { IContact } from './contacts.definition';
import ContactsModel from './contacts.model';
import contactsModel from './contacts.model';


async function deleteContact(ctx) {
  const { id } = ctx.params;
  await ContactsModel.delete(id);

  ctx.body = { message: 'Success.' };
}

async function getContacts(ctx) {
  const { orderBy, orderDirection, offset, count } = ctx.query;
  const contacts: IContact[] = await ContactsModel.model.findAll({
    where: { isDeleted: { [Op.not]: true } },
    limit: toNumber(count) || 50,
    offset: toNumber(offset) || 0,
    order: [[orderBy || 'name', orderDirection || 'ASC']],
  });

  ctx.body = contacts;
}

async function createContact(ctx) {
  const { name, phone } = ctx.request.body;
  const contact: IContact = await ContactsModel.model.create({ name, phone });

  ctx.body = contact;
}

async function importFile(ctx) {
  const strategy = ctx.request.body.strategy || 'allNewStrategy';
  const fileData: string = fs.readFileSync(ctx.request.files.file.path, 'utf8');
  const parsedContacts: IContact[] = JSON.parse(fileData).contacts;

  let baseField: string;
  let updateField: string;
  let batchUpdate: IContact[] = [];

  if (strategy === 'sameNameStrategy') {
    baseField = 'name';
    updateField = 'phone';
  } else if (strategy === 'samePhoneStrategy') {
    baseField = 'phone';
    updateField = 'name';
  } else if (strategy === 'allNewStrategy') {
    batchUpdate = parsedContacts.map(pc => pc);
  }

  if (strategy === 'sameNameStrategy' || strategy === 'samePhoneStrategy') {
    let existingContacts: any = await ContactsModel.findAll({
      [baseField]: { [Op.in]: parsedContacts.map(c => c[baseField]) }
    })
    existingContacts = existingContacts.map(v => v.dataValues);
    parsedContacts.forEach(parsedContact => {
      const existingContact = existingContacts.find(ec => ec[baseField] === parsedContact[baseField]);
      if (!existingContact) {
        batchUpdate.push(parsedContact);
      } else if (existingContact[updateField] !== parsedContact.phone) {
        batchUpdate.push({ ...existingContact, [updateField]: parsedContact[updateField], updatedAt: new Date() });
      }
    });
  }
  await ContactsModel.model.bulkCreate(batchUpdate, { updateOnDuplicate: ['name', 'phone', 'updatedAt'] });

  ctx.body = { message: 'Success.' };
}

async function exportFile(ctx) {
  const contacts: IContact[] = await ContactsModel.model.findAll({
    where: { isDeleted: { [Op.not]: true } },
    attributes: ['name', 'phone'],
  });
  ctx.body = { contacts };
  ctx.set('Content-disposition', 'attachment; filename=contacts.json');
  ctx.set('Content-type', 'application/json');
}

async function updateContact(ctx) {
  const { id } = ctx.params;
  const { name, phone } = ctx.request.body;
  const contact: IContact = await ContactsModel.update(id, { name, phone });

  ctx.body = contact;
}

export const routes = {
  delete: {
    '/contacts/:id': deleteContact,
  },
  get: {
    '/contacts': getContacts,
    '/contacts/exportFile': exportFile,
  },
  post: {
    '/contacts': createContact,
    '/contacts/importFile': importFile,
  },
  put: {
    '/contacts/:id': updateContact,
  }
};