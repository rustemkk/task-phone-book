import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import SvgIcon from 'components/SvgIcon';
import { getAllContacts } from 'modules/contacts/selectors';
import { showModal } from 'modules/modals/actions';
import { CONTACT_MODAL } from 'modules/modals/constants';

import s from './index.module.scss';


const mapStateToProps = (state) => ({
  contacts: getAllContacts(state),
});

const mapDispatchToProps = {
  showModal,
}

const Contact = ({ contact, showModal }) => {
  return (
    <span className={s.Contact} onClick={() => showModal(CONTACT_MODAL, { contactId: contact.id })}>
      <div className={s.Icon}>
        <SvgIcon className={s.IconPerson} name="person" size={30} />
      </div>
      <div className={s.Name}>
        {contact.name}
      </div>
      <div className={s.Phone}>
        {contact.phone}
      </div>
    </span>
  );
}

Contact.propTypes = {
  contact: PropTypes.object.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Contact);