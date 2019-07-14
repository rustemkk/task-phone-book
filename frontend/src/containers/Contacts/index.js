import { get } from 'lodash';
import { PropTypes } from 'prop-types';
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Waypoint } from 'react-waypoint';

import Contact from 'components/Contact';
import Loading from 'components/Loading';
import { loadContacts } from 'modules/contacts/actions';
import { getAllContacts, getStatus } from 'modules/contacts/selectors';

import s from './index.module.scss';


const mapStateToProps = (state) => ({
  contacts: getAllContacts(state),
  status: getStatus(state),
});

const mapDispatchToProps = {
  loadContacts,
}

const Contacts = ({ contacts, loadContacts, status: { isLoaded, isLoading } }) => {

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
      {!isLoaded &&
        (isLoading ?
          <div className={s.LoadingContainer}>
            <Loading size={30} />
          </div> :
          <Waypoint onEnter={() => loadContacts(contacts.length)} />
        )
      }
    </div>
  );
}

Contacts.propTypes = {
  contacts: PropTypes.array.isRequired,
  status: PropTypes.object.isRequired,
  loadContacts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);