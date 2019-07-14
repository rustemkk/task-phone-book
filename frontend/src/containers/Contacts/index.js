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
      <div className={s.ContactsHeader}>
        <div className={s.Icon}></div>
        <div className={s.Name}>
          Name
        </div>
        <div className={s.Phone}>
          Phone number
        </div>
        <div className={s.Date}>
          Created at
        </div>
        <div className={s.Date}>
          Updated at
        </div>
      </div>
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