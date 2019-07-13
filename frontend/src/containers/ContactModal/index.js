import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';
import FormInput from 'components/FormInput';
import { createContact, deleteContact, updateContact } from 'modules/contacts/actions';
import { getContactById } from 'modules/contacts/selectors';
import { showModal } from 'modules/modals/actions';
import { CONFIRMATION_MODAL } from 'modules/modals/constants';
import { useForm } from 'utils/hooks';

import s from './index.module.scss';


const newContact = {
  name: '',
  phone: ''
};

const validator = (values) => {
  let errors = {};
  if (!values.name) {
    errors.name = 'Name is required';
  }
  if (!values.phone) {
    errors.phone = 'Phone number is required';
  }
  return errors;
};

const mapStateToProps = (state, ownProps) => ({
  contact: ownProps.contactId ? getContactById(ownProps.contactId)(state) : newContact,
});

const mapDispatchToProps = {
  createContact,
  deleteContact,
  showModal,
  updateContact,
};

const ContactModal = ({ contact, contactId, createContact, deleteContact, onHideModal, showModal, updateContact }) => {

  const handleSave = (values) => {
    contactId ? updateContact(values) : createContact(values);
    onHideModal();
  }

  const handleDelete = () => {
    showModal(CONFIRMATION_MODAL, {
      callback: () => {
        deleteContact(contactId);
        onHideModal();
      },
      text: `Do you really want to delete contact "${contact.name}"?`,
    })
  }

  const form = useForm(() => handleSave(values), validator, contact);
  const { handleSubmit, values } = form;

  return (
    <form onSubmit={handleSubmit}>
      <div className={s.Data}>
        <FormInput
          autoFocus
          label="Name"
          name="name"
          placeholder="Enter name"
          {...form}
        />
        <FormInput
          label="Phone number"
          name="phone"
          placeholder="Enter phone number"
          {...form}
        />
      </div>
      <div className={s.Bottom}>
        <Button title="Save" type="submit" />
        {contactId &&
          <Button className={s.ButtonDelete} onClick={handleDelete} title="Delete" type="button" />
        }
      </div>
    </form>
  );
}

ContactModal.propTypes = {
  contact: PropTypes.object.isRequired,
  contactId: PropTypes.number,
  createContact: PropTypes.func.isRequired,
  deleteContact: PropTypes.func.isRequired,
  onHideModal: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
  updateContact: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactModal);