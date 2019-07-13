import { isFunction } from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import ClickOutHandler from 'react-onclickout';

import ConfirmationModal from 'components/ConfirmationModal';
import SvgIcon from 'components/SvgIcon';
import ContactModal from 'containers/ContactModal';
import ImportModal from 'containers/ImportModal';
import { hideModal } from 'modules/modals/actions';
import * as modalsConstants from 'modules/modals/constants';

import s from './index.module.scss';


const MODAL_COMPONENTS = {
  [modalsConstants.CONFIRMATION_MODAL]: ConfirmationModal,
  [modalsConstants.CONTACT_MODAL]: ContactModal,
  [modalsConstants.IMPORT_MODAL]: ImportModal,
};

const mapStateToProps = state => ({
  modals: state.modals.modals
});

const mapDispatchToProps = {
  hideModal
};

const Modals = ({ modals, hideModal }) => {

  const handleHideModal = (modalType, modalProps = {}) => {
    hideModal(modalType);
    isFunction(modalProps.onHideModal) && modalProps.onHideModal();
  }

  return !modals.length ? null : modals.map(({ modalType, modalProps }) => {
    const Modal = MODAL_COMPONENTS[modalType];
    return (
      <div className={s.ModalBackground} key={modalType}>
        <ClickOutHandler onClickOut={() => hideModal(modalType)}>
          <div className={s.Modal}>
            <SvgIcon className={s.IconClose} name="close" onClick={() => handleHideModal(modalType, modalProps)} size={30} />
            <Modal onHideModal={() => hideModal(modalType)} {...modalProps} />
          </div>
        </ClickOutHandler>
      </div>
    );
  });
};

Modals.propTypes = {
  hideModal: PropTypes.func.isRequired,
  modals: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(Modals);