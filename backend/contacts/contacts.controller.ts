import { IContact } from './contacts.definition';
import ContactsModel from './contacts.model';


async function getContacts(ctx) {
  const { orderBy, orderDirection, offset, count } = ctx.query;
  const contacts: IContact[] = await ContactsModel.findAll(
    {}, count, offset, [[orderBy || 'name', orderDirection || 'ASC']]
  );

  ctx.body = contacts;
}

async function createContact(ctx) {
  const { name, phone } = ctx.request.body;
  const contact: IContact = await ContactsModel.model.create({ name, phone });

  ctx.body = contact;
}

async function updateContact(ctx) {
  const { id } = ctx.params;
  const { name, phone } = ctx.request.body;
  const contact: IContact = await ContactsModel.update(id, { name, phone });

  ctx.body = contact;
}

async function deleteContact(ctx) {
  const { id } = ctx.params;
  await ContactsModel.delete(id);

  ctx.body = 'Success.';
}

export const routes = {
  delete: {
    '/contacts/:id': deleteContact,
  },
  get: {
    '/contacts': getContacts,
  },
  post: {
    '/contacts': createContact,
  },
  put: {
    '/contacts/:id': updateContact,
  }
};