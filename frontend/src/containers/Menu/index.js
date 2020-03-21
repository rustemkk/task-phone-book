import { PropTypes } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import SvgIcon from 'components/SvgIcon';
import { exportContactsToFile } from 'modules/contacts/actions';
import { showModal } from 'modules/modals/actions';
import * as modalsConstants from 'modules/modals/constants';

import s from './index.module.scss';


const mapDispatchToProps = {
  exportContactsToFile,
  showModal,
}

const Menu = ({ exportContactsToFile, showModal }) => {
  return (
    <div className={s.Menu}>
      <div className={s.MenuItemContainer} onClick={() => showModal(modalsConstants.CONTACT_MODAL)}>
        <div className={s.MenuItem}>
          <SvgIcon className={s.IconPersonPlus} name="personPlus" size={30} />
          <span className={s.MenuItemLabel}>Create contact</span>
        </div>
      </div>
      <div className={s.MenuItemContainer} onClick={() => showModal(modalsConstants.IMPORT_MODAL)}>
        <div className={s.MenuItem}>
          <SvgIcon className={s.IconPersonPlus} name="upload" size={30} />
          <span className={s.MenuItemLabel}>Import contacts from file</span>
        </div>
      </div>
      <div className={s.MenuItemContainer} onClick={() => exportContactsToFile()}>
        <div className={s.MenuItem}>
          <SvgIcon className={s.IconPersonPlus} name="download" size={30} />
          <span className={s.MenuItemLabel}>Export contacts to file</span>
        </div>
      </div>
    </div>
  );
}

Menu.propTypes = {
  exportContactsToFile: PropTypes.func.isRequired,
  showModal: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(Menu);