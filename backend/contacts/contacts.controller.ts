import { IContact } from './contacts.definition';
import ContactsModel from './contacts.model';


async function getContacts(ctx) {
  const { orderBy, orderDirection, offset, count } = ctx.query;
  // TODO: orderBy validation
  // TODO: pagination 
  // console.log(orderBy, orderDirection, offset, count);
  // const allowedOrderBy = ['name', 'phone', 'createdAt', 'updatedAt'];
  // const allowedOrderDirection = ['ASC', 'DESC'];
  const contacts: IContact[] = await ContactsModel.model.findAll({
    order: [[orderBy || 'name', orderDirection || 'ASC']]
  });

  ctx.body = contacts;
}

async function createContact(ctx) {
  const { name, phone } = ctx.request.body;
  const contact: IContact = await ContactsModel.model.create({ name, phone });

  ctx.body = contact;
}

async function updateContact(ctx) {
}

async function deleteContact(ctx) {
}

export const routes = {
  get: {
    '/contacts': getContacts,
  },
  post: {
    '/contacts/create': createContact,
    '/contacts/update': updateContact,
    // TODO: delete HTTP method
    '/contacts/delete': deleteContact,
  }
};