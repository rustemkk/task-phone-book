import { schema } from 'normalizr';


const contactSchema = new schema.Entity('contacts');

export const contactsSchema = [contactSchema];