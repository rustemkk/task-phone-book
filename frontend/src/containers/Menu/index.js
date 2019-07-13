import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import Button from 'components/Button';
import { showModal } from 'modules/modals/actions';
import * as modalsConstants from 'modules/modals/constants';

import s from './index.module.scss';


const mapDispatchToProps = {
  showModal,
}

const Menu = ({ showModal }) => {
  return (
    <div className={s.Menu}>
      <Button
        className={s.MenuButton}
        title="Create contact"
        onClick={() => showModal(modalsConstants.CONTACT_MODAL)}
        type="button"
      />
      <Button
        className={s.MenuButton}
        title="Import contacts from file"
        onClick={() => showModal(modalsConstants.IMPORT_MODAL)}
        type="button"
      />
      <Button
        className={s.MenuButton}
        title="Export contacts to file"
        type="button"
      />
    </div>
  );
}

Menu.propTypes = {
  showModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Menu);