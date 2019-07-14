import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';

import Contact from 'components/Contact';
import { loadContacts } from 'modules/contacts/actions';
import { getAllContacts } from 'modules/contacts/selectors';

import s from './index.module.scss';


const mapStateToProps = (state) => ({
  contacts: getAllContacts(state),
});

const mapDispatchToProps = {
  loadContacts,
}

const Contacts = ({ contacts, loadContacts }) => {

  useEffect(() => {
    loadContacts();
  }, [loadContacts]);

  return (
    <div className={s.Contacts}>
      {contacts.map(contact =>
        <Contact contact={contact} key={contact.id} />
      )}
    </div>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  loadContacts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);